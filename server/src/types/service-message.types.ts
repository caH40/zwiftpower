import { SERVICE_MESSAGE_TYPE } from '../assets/service_message/constants';

/**
 * Типы сообщений внутри сайта.
 */
export type TServiceMessageType = (typeof SERVICE_MESSAGE_TYPE)[number];

export type TCreateMethodServiceMessageParams = {
  recipientUser: string;
  initiatorUser?: string;
  type: TServiceMessageType;
  title: string;
  text: string;
  entityUrl?: string;
  externalEntityUrl?: string;
  entityLogo?: string;
};

export type TeamMessageResult = {
  text: string;
  title: string;
};
