import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    scenarios: {
        przykladowy_scenariusz_1: {
              executor: "per-vu-iterations",
              startTime: "0s",     // rozpocznij natychmiast przy starcie testu
              vus: 10,             // wykorzystaj 10 użytkowników
              iterations: 10,      // wykonaj po 10 iteracji na użytkownika
              maxDuration: '1m',   // zakończ test po 1m (nawet jeśli nie uda się wykonać 100 iteracji)
            },
        przykladowy_scenariusz_2: {
              executor: 'shared-iterations',
              startTime: '10s',    // rozpocznij po 10s od startu testu
              gracefulStop: '10s', // czekaj 10s na zakończenie rozpoczętych iteracji po upływie maxDuration
              vus: 10,             // wykorzystaj 10 użytkowników
              iterations: 1000,    // wykonaj 1000 iteracji (łącznie)
              maxDuration: '1m',   // zakończ test po 1m (nawet jeśli nie uda się wykonać 1000 iteracji)
              exec: "custom_test_function" // wykorzystaj inną funkcję niż przykladowy_scenariusz_1
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
