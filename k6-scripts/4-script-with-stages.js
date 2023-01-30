import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 50 }, // etap 1: zwiększanie liczby userów od 0 do 50 w 10s
    { duration: '30s', target: 50 }, // etap 2: testuj z użyciem 50 userów przez 30s
    { duration: '10s', target: 0 },  // etap 3: zmniejszanie liczby userów z 50 do 0 w 10s
  ]
};

export default function () {
  http.get('http://localhost:8080/get');
  sleep(1);

  const payload = JSON.stringify({
      id: 1,
      text: 'aaaaaaa',
    });

  const params = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  http.post('http://localhost:8080/post', payload, params)
  sleep(1);

  http.del('http://localhost:8080/delete/1')
  sleep(1);
}

