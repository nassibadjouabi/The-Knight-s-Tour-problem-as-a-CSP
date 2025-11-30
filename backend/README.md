## Usage

first run the python script with:

```python
python main.py
```

then use JS to send an http request

```js
import axios from "axios";

axios.post("http://localhost:8080/solve", 
    {method: "heuristic"},
    { timeout: 50000 } 
)
.then(res => {
  console.log("Response:", res.data);
})
.catch(err => {
  console.error("Error:", err);
});

```