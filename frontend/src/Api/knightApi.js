// src/Api/knightApi.js
export async function solveKnightTour(method, startX, startY) {
  try {
    const response = await fetch('http://localhost:3001/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        method: method, // "heuristic" ou "blind"
        start: [startX, startY]
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    if (!data.tour || data.tour.length === 0) {
      throw new Error('No solution found');
    }
    
    return data.tour;
  } catch (error) {
    console.error('API call failed:', error);
    throw new Error(`Failed to solve knight tour: ${error.message}`);
  }
}