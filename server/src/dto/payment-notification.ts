// types
import { Types } from 'mongoose';
import { TPaymentNotification } from '../types/payment.types';
import { TPaymentNotificationDto } from '../types/dto.interface';

export function paymentNotificationDto(
  notification: TPaymentNotification & { _id: Types.ObjectId }
): TPaymentNotificationDto {
  const _id = notification._id.toString();
  const user = notification.user.toString();
  const capturedAt = notification.capturedAt?.toISOString();
  const expiresAt = notification.expiresAt?.toISOString();
  const createdAt = notification.createdAt?.toISOString();

  return { ...notification, _id, user, capturedAt, expiresAt, createdAt };
}
