import time
from aiohttp import web
from algorithm.solver import Knight


async def solve_tour(request):
    """API Endpoint to solve the tour"""
    try:
        data = await request.json()
        start_x = int(data.get('startX', 0))
        start_y = int(data.get('startY', 0))
        method = data.get('method', 'heuristic')
        
        use_heuristics = (method == 'heuristic')
        
        print(f"Solving Knight's Tour starting at ({start_x}, {start_y}) using {'CSP Heuristics' if use_heuristics else 'Blind Backtracking'}...")
        
        solver = Knight(start_x, start_y, use_heuristics)
        
        start_time = time.time()
        solution = solver.solve()
        end_time = time.time()
        
        if solution:
            return web.json_response({
                'status': 'success',
                'path': solution,
                'time': round(end_time - start_time, 4)
            })
        else:
            return web.json_response({
                'status': 'failed',
                'message': 'No solution found (algorithm might have timed out or hit dead end)'
            })

    except Exception as e:
        print(f"Error: {e}")
        return web.json_response({'status': 'error', 'message': str(e)}, status=500)

# AJOUTEZ CES FONCTIONS POUR CORS
async def handle_options(request):
    return web.Response(
        status=200,
        headers={
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        }
    )

@web.middleware
async def cors_middleware(request, handler):
    try:
        response = await handler(request)
    except web.HTTPException as ex:
        response = ex

    # Apply CORS headers ALWAYS — even on errors
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    response.headers['Access-Control-Max-Age'] = '86400'
    return response

app = web.Application(middlewares=[cors_middleware])
app.router.add_post('/solve', solve_tour)
app.router.add_options('/solve', handle_options)  # Pour les preflight requests

if __name__ == '__main__':
    print("Starting server at http://localhost:8080")
    web.run_app(app, port=8080)