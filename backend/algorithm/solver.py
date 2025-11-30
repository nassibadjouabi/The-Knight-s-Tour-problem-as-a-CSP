
# ==========================================
# PART 1: ALGORITHM IMPLEMENTATION (CSP)
# ==========================================

class Knight:
    def __init__(self, start_x, start_y, use_heuristics=True):
        self.N = 8
        self.moves = [
            (2, 1), (1, 2), (-1, 2), (-2, 1),
            (-2, -1), (-1, -2), (1, -2), (2, -1)
        ]
        self.start_x = start_x
        self.start_y = start_y
        self.use_heuristics = use_heuristics

    def is_valid(self, x, y, visited):
        return (0 <= x < self.N and 0 <= y < self.N and (x, y) not in visited)

    def successor_fct(self, x, y, visited):
        candidates = []
        for dx, dy in self.moves:
            nx, ny = x + dx, y + dy
            if self.is_valid(nx, ny, visited):
                candidates.append((nx, ny))
        return candidates

    def count_degree(self, x, y, visited):
        count = 0
        for dx, dy in self.moves:
            nx, ny = x + dx, y + dy
            if self.is_valid(nx, ny, visited):
                count += 1
        return count

    def MRV(self, successors, visited):
        scored = []
        for nx, ny in successors:
            degree = self.count_degree(nx, ny, visited)
            scored.append(((nx, ny), degree))
        scored.sort(key=lambda item: item[1])
        return scored

    def _lcv_score(self, pos, visited):
        nx, ny = pos
        visited_temp = set(visited)
        visited_temp.add((nx, ny))
        score = 0
        for dx, dy in self.moves:
            sx, sy = nx + dx, ny + dy
            if self.is_valid(sx, sy, visited_temp):
                score += self.count_degree(sx, sy, visited_temp)
        return score

    def LCV(self, scored_successors, visited):
        groups = {}
        for pos, degree in scored_successors:
            groups.setdefault(degree, []).append(pos)
        ordered = []
        for degree in sorted(groups.keys()):
            bucket = groups[degree]
            bucket.sort(key=lambda p: self._lcv_score(p, visited), reverse=True)
            ordered.extend(bucket)
        return ordered

    def solve(self):
        assignment = [(self.start_x, self.start_y)]
        visited = {(self.start_x, self.start_y)}
        if self.backtracking(assignment, visited):
            return assignment
        return None

    def backtracking(self, assignment, visited):
        if len(assignment) == self.N * self.N:
            return True
        current_x, current_y = assignment[-1]
        successors = self.successor_fct(current_x, current_y, visited)
        if not successors:
            return False
        if self.use_heuristics:
            scored = self.MRV(successors, visited)
            successors = self.LCV(scored, visited)
        for nx, ny in successors:
            assignment.append((nx, ny))
            visited.add((nx, ny))
            if self.backtracking(assignment, visited):
                return True
            visited.remove((nx, ny))
            assignment.pop()
        return False