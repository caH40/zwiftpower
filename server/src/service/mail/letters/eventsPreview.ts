import { serverFront } from '../../../config/environment.js';
import { TEventForMailingPreviewDto } from '../../../types/dto.interface.js';
import { getTimerLocal } from '../../../utils/date-local.js';
import { getMapName, getRouteName } from '../../../utils/event-data.js';

const categoryColors = {
  A: '#dc4119',
  B: '#58c34e',
  C: '#3ec0e9',
  D: '#fccf0b',
  E: '#943e5e',
} as Record<string, string>;

const generateCategoryBadge = (subgroupLabel: string) => {
  const color = categoryColors[subgroupLabel] || '#3498db';

  return `
    <span style="
      background-color: ${color};
      color: #ffffff;
      padding: 0px;
      border-radius: 12px;
      font-weight: bold;
      font-size: 12px;
      display: inline-block;
      margin: 3px;
      width: 24px;
      height: 24px;
      line-height: 24px;
      text-align: center;
      font-family: Arial, sans-serif;
    ">${subgroupLabel}</span>
  `;
};

// Генерация HTML для одного события
function generateEventHTML(event: TEventForMailingPreviewDto) {
  const firstSubgroup =
    event.eventSubgroups && event.eventSubgroups.length > 0 ? event.eventSubgroups[0] : null;

  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px; background: #ffffff; border-radius: 10px; border: 1px solid #dddddd;">
      <tr>
        <td style="padding: 20px; position: relative;">
          <!-- Event Header -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${`
              <tr>
                <td align="center" valign="top" style="padding-bottom: 20px;">
                  <img src="${
                    event.seriesId?.posterUrls?.original
                      ? event.seriesId.posterUrls.original
                      : event.imageUrl
                  }" 
                      alt="${event.seriesId ? event.seriesId.name : event.name}" 
                      style="max-width: 250px; height: 150px; object-fit: cover; border-radius: 8px; display: block; margin: 0 auto;">
                </td>
              </tr>
            `}
            
            <tr>
              <td align="left" style="padding-bottom: 10px;">
                <h2 style="color: #333333; font-size: 22px; font-weight: bold; margin: 0; font-family: Arial, sans-serif;">
                  ${event.name}
                </h2>
              </td>
            </tr>
            
            <tr>
              <td align="left" style="padding-bottom: 10px;">
                <p style="color: #e74c3c; font-size: 16px; font-weight: bold; margin: 0; font-family: Arial, sans-serif;">
                  📅 ${getTimerLocal(event.eventStart, 'DDMMYYHm', { weekday: true })}
                </p>
              </td>
            </tr>
            
            ${
              event.seriesId
                ? `
            <tr>
              <td align="left" style="padding-bottom: 10px;">
                <p style="color: #333333; margin: 0; font-family: Arial, sans-serif;">
                  Серия: 
                  <a href="${serverFront}/series/${event.seriesId.urlSlug}/schedule" 
                     style="color: #667eea; text-decoration: none;"
                     target="_blank">
                    ${event.seriesId.name}
                  </a>
                </p>
              </td>
            </tr>
            `
                : ''
            }
            
            ${
              event.organizerId
                ? `
            <tr>
              <td align="left" style="padding-bottom: 10px;">
                <table cellpadding="0" cellspacing="0" border="0" style="margin: 0;">
                  <tr>
                    <td valign="middle">
                      <span style="color: #333333; font-family: Arial, sans-serif;">
                        Организатор: ${event.organizerId.name}
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            `
                : ''
            }
          </table>

          <!-- Event Details -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 15px 0;">
            <tr>
              <td align="left" style="padding-bottom: 10px;">
                <h3 style="color: #333333; margin: 0; font-family: Arial, sans-serif; font-size: 18px;">
                  Группы заезда: ${event.eventSubgroups
                    ?.map((subgroup) => generateCategoryBadge(subgroup.subgroupLabel))
                    .join('')}
                </h3>
              </td>
            </tr>
              
            ${
              firstSubgroup
                ? `
            <tr>
              <td>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #f8f9fa; border-radius: 8px; border-left: 4px solid #3498db;">
                <tr>
                  <td style="padding: 15px; color: #555555; font-family: Arial, sans-serif; font-size: 14px;">
                    <div style="padding: 2px 0;">
                      <strong>Карта:</strong> ${getMapName(firstSubgroup.mapId)}
                    </div>
                    <div style="padding: 2px 0;">
                      <strong>Маршрут:</strong> ${getRouteName(firstSubgroup.routeId)}
                    </div>
                    ${
                      firstSubgroup.laps
                        ? `<div style="padding: 2px 0;"><strong>Круги:</strong> ${firstSubgroup.laps}</div>`
                        : ''
                    }
                    ${
                      firstSubgroup.distanceSummary?.distanceInKilometers
                        ? `<div style="padding: 2px 0;"><strong>Расстояние:</strong> ${Math.round(
                            firstSubgroup.distanceSummary.distanceInKilometers
                          )} км</div>`
                        : ''
                    }
                    ${
                      firstSubgroup.distanceSummary?.elevationGainInMeters
                        ? `<div style="padding: 2px 0;"><strong>Набор высоты:</strong> ${Math.round(
                            firstSubgroup.distanceSummary.elevationGainInMeters
                          )} м</div>`
                        : ''
                    }
                    <div align="right" style="padding-top: 10px;">
                      <span style="color: #999999; font-size: 10px;">
                        * Данные для группы "${firstSubgroup.subgroupLabel}"
                      </span>
                    </div>
                  </td>
                </tr>
              </table>
              </td>
            </tr>
            `
                : ''
            }
          </table>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 20px;  border-top: 1px solid #eeeeee;">
            <tr>
              <td align="center">
                <a href="${serverFront}/race/schedule/${event.id}" 
                   style="background: linear-gradient(135deg, #ff7c00, #ffb773); color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block; font-family: Arial, sans-serif; font-size: 14px; margin-top: 20px">
                  Присоединиться к заезду
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}

/**
 *  Функция генерации HTML для email - карточки предстоящих Эвентов.
 */
export function generateEmailHTML(
  eventsEmailPreview: {
    events: TEventForMailingPreviewDto[];
    startDate: string;
    endDate: string;
    subject: string;
  },
  userId: string,
  userZwiftId?: number
) {
  if (!eventsEmailPreview || eventsEmailPreview.events.length === 0) {
    return `
      <div style="text-align: center; padding: 60px 20px; color: #666666; font-family: Arial, sans-serif;">
        <h2 style="color: #333333;">Нет событий для отображения</h2>
        <p>Добавьте события для создания превью письма</p>
      </div>
    `;
  }

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${eventsEmailPreview.subject}</title>
    <style type="text/css">
        body { width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; font-family: Arial, sans-serif; }
        .ExternalClass { width: 100%; }
        .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
        img { outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
        table { border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
        @media only screen and (max-width: 480px) {
            table[class="mobile-full"] { width: 100% !important; }
            img[class="mobile-img"] { max-width: 100% !important; height: auto !important; }
            .mobile-center { text-align: center !important; }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f5f5f5;">
    <center>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f5">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius: 12px; overflow: hidden;">
                        <!-- Header -->
                        <tr>
                            <td align="center" bgcolor="#667eea" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" style="padding: 30px; color: #ffffff;">
                                <h1 style="margin: 0; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                    ${eventsEmailPreview.subject}
                                </h1>
                                <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px; font-family: Arial, sans-serif;">
                                    c ${getTimerLocal(
                                      eventsEmailPreview.startDate,
                                      'DDMMYY'
                                    )} по ${getTimerLocal(eventsEmailPreview.endDate, 'DDMMYY')}
                                </p>
                                <p style="margin: 10px 0 0; opacity: 0.9; font-size: 16px; font-family: Arial, sans-serif;">
                                    Не пропустите эти захватывающие события!
                                </p>
                                <p style="margin: 10px 0 0; font-size: 14px; font-family: Arial, sans-serif;">
                                    Всего событий: ${eventsEmailPreview.events.length}
                                </p>
                            </td>
                        </tr>

                        <!-- Events List -->
                        <tr>
                            <td align="center" style="padding: 20px;">
                                ${eventsEmailPreview.events
                                  .map((event) => generateEventHTML(event))
                                  .join('')}
                            </td>
                        </tr>

                        <!-- Footer -->
                        <tr>
                            <td align="center" style="padding: 20px; border-top: 1px solid #dddddd;">
                                <p style="color: #666666; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
                                    Это письмо отправлено автоматически. Пожалуйста, не отвечайте на него.
                                </p>

                                <p style="margin: 0; text-align: center;">
                                  ${
                                    userZwiftId
                                      ? `<a href="${serverFront}/profile/${userZwiftId}/settings/notifications" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
                                        Управление оповещением
                                      </a>
                                    `
                                      : `<a href="${serverFront}/notifications/unsubscribe/${userId}" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
                                        Отменить все оповещения
                                      </a>
                                    `
                                  }
                                  
                                </p>

                                <p style="color: #666666; font-size: 12px; margin: 5px 0 0; font-family: Arial, sans-serif;">
                                    © 2025 ZwiftPower.ru Все права защищены.
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
  `;
}
