import { Types } from 'mongoose';

import { TeamModel } from '../../Model/Team.js';
import { Rider } from '../../Model/Rider.js';
import { User } from '../../Model/User.js';

// types
import { TFileMetadataForCloud } from '../../types/model.interface.js';
import { createUrlsToFileCloud } from '../../utils/url.js';

/**
 * Класс для получения данных для классов сервисных сообщений.
 */
export class MessageDataProvider {
  /** Данные пользователя. */
  async getUser(userId: string): Promise<{ name: string; zwiftId: number; imageSrc?: string }> {
    const userDB = await User.findById(userId, {
      zwiftId: true,
      _id: false,
    }).lean<{ zwiftId: number }>();

    if (!userDB) {
      throw new Error(`Не найден пользователь с _id: "${userId}"`);
    }

    const riderDB = await Rider.findOne(
      { zwiftId: userDB.zwiftId },
      {
        firstName: true,
        lastName: true,
        imageSrc: true,
        _id: false,
      }
    ).lean<{ lastName: string; firstName: string; imageSrc?: string }>();

    if (!riderDB) {
      throw new Error(`Не найден райдер с zwiftId: "${userDB.zwiftId}"`);
    }

    return {
      name: `${riderDB.firstName} ${riderDB.lastName}`,
      zwiftId: userDB.zwiftId,
      imageSrc: riderDB.imageSrc,
    };
  }

  /** Данные команды. */
  async getTeam(teamId: string): Promise<{
    _id: string;
    name: string;
    creator: string;
    urlSlug: string;
    logoUrl?: string;
  }> {
    const teamDB = await TeamModel.findById(teamId, {
      name: true,
      creator: true,
      urlSlug: true,
      logoFileInfo: true,
    }).lean<{
      _id: Types.ObjectId;
      creator: Types.ObjectId;
      name: string;
      urlSlug: string;
      logoFileInfo: TFileMetadataForCloud;
    }>();

    if (!teamDB) {
      throw new Error(`Не найдена команда с _id: "${teamId}"`);
    }

    // Лого команды сохраняется только в типе original.
    const logoUrl = createUrlsToFileCloud(teamDB.logoFileInfo)?.original;

    return {
      _id: teamDB._id.toString(),
      name: teamDB.name,
      creator: teamDB.creator.toString(),
      urlSlug: teamDB.urlSlug,
      logoUrl,
    };
  }

  async getAdminIds(): Promise<string[]> {
    const usersDB = await User.find(
      { role: 'admin' },
      {
        _id: true,
      }
    ).lean<{ _id: Types.ObjectId }[]>();

    return usersDB.map((u) => u._id.toString());
  }
}
