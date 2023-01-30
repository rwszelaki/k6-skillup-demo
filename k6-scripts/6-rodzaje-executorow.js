import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        per_vu_iterations: {
              executor: "per-vu-iterations",
              vus: 10,             // wykorzystaj 10 użytkowników
              iterations: 10,      // wykonaj po 10 iteracji na użytkownika
            },

        shared_iterations: {
              executor: 'shared-iterations',
              vus: 10,             // wykorzystaj 10 użytkowników
              iterations: 1000,    // wykonaj 1000 iteracji (łącznie)
            },

        constant_vus: {
              executor: 'constant-vus',
              vus: 10,             // wykorzystaj 10 użytkowników
              duration: '30s',     // testuj przez 30s
            },

        ramping_vus: {
              executor: 'ramping-vus',
              startVUs: 10,        // zacznij z 10 użytkownikami
              stages: [
                { duration: '20s', target: 100 }, // zwiększ liczbę użytkowników do 100 przez 20s
                { duration: '10s', target: 0 },   // zmniejsz liczbę użytkowników do 0 przez 10s
              ],
              gracefulRampDown: '10s', // czekaj 10s na zakończenie rozpoczętych iteracji
            },

        constant_arrival_rate: {
              executor: 'constant-arrival-rate',
              preAllocatedVUs: 10,
              duration: '30s',  // testuj przez 30 s
              rate: 30,         // zaczynaj 30 nowych iteracji na sekundę
              timeUnit: '1s',
            },

        ramping_arrival_rate: {
              executor: 'ramping-arrival-rate',
              preAllocatedVUs: 10,
              startRate: 10,    // zacznij z 10 iteracjami
              timeUnit: '1m',
              stages: [
                { target: 30, duration: '1m' }, // zaczynaj 30 nowych iteracji na sekundę, przez 1 minutę
                { target: 60, duration: '2m' }, // stopniowo zwiększ liczbę rozpoczynanych iteracji do 60, w ciągu 2 minut
                { target: 60, duration: '4m' }, // zaczynaj 60 nowych iteracji na sekundę, przez 4 minuty
                { target: 0, duration: '2m' }, // stopniowo zmniejsz liczbę rozpoczynanych iteracji do 0
              ],
            },

    }
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

export function custom_test_function() {
  http.get('http://localhost:8080/get');
  sleep(1);
}
