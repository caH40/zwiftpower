export async function putEventService(eventId) {
  try {
    console.log({ eventId });
    return { message: 'Обновлены данные заезда' };
  } catch (error) {
    throw error;
  }
}
