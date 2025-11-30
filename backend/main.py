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
        
        # Running the blocking CPU-bound algorithm
        # In production, run this in an executor to avoid blocking the async loop
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

app = web.Application()
app.router.add_post('/solve', solve_tour)

if __name__ == '__main__':
    print("Starting server at http://localhost:8080")
    web.run_app(app, port=8080)