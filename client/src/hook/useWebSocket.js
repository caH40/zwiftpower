/* eslint-disable no-console */
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import { webSocketServer } from '../config/environment';
import { audioTracks } from '../assets/audio';

export function useWebSocket(setServerData) {
  const { volume } = useSelector((state) => state.audio);
  const audioRef = useRef();

  useEffect(() => {
    audioRef.current = audioTracks.notification;

    if (audioRef.current) {
      audioRef.current.volume = volume;
    }

    const token = localStorage.getItem('__zp_accessToken');

    const ws = new WebSocket(webSocketServer);

    ws.onerror = (error) => {
      console.error('Ошибка соединения WebSocket:', error);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'AUTH',
          token,
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'AUTH_REQUIRED':
            console.log(data.message);
            break;

          case 'AUTH_SUCCESS':
            console.log('Authenticated successfully');
            break;

          case 'SERVICE_MESSAGES':
            setServerData(data.data);
            if (data.audioType === 'notification') {
              audioRef.current?.play().catch(() => {});
            }
            break;

          case 'AUTH_ERROR':
            throw new Error('Auth failed:', data.message);

          default:
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    ws.onclose = (event) => {
      // eslint-disable-next-line no-console
      console.log('🔌 WebSocket closed:', {
        code: event.code,
        reason: event.reason,
        wasClean: event.wasClean,
        timestamp: new Date().toISOString(),
      });
    };

    return () => ws.close();
  }, [setServerData]);
}
