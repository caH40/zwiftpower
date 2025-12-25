import { serverFront } from '../../../config/environment.js';
import { getTimerLocal } from '../../../utils/date-local.js';
import { content } from '../../../utils/text.js';

type TLetterParams = {
  text: string;
  title: string;
  tags: string[];
  userId: string;
  zwiftId?: number;
};

export function createNotificationLetter({
  text,
  title,
  tags,
  zwiftId,
  userId,
}: TLetterParams) {
  const date = getTimerLocal(Date.now(), 'DDMMYYHm');

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>${title}</title>
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
        .tag-badge {
            background-color: #e8f4fd;
            color: #3498db;
            padding: 2px 8px;
            border-radius: 12px;
            font-size: 11px;
            font-weight: bold;
            display: inline-block;
            margin: 2px;
            font-family: Arial, sans-serif;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f5f5f5;">
    <center>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f5f5f5">
            <tr>
                <td align="center" style="padding: 20px 0;">
                    <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
                        <!-- Header -->
                        <tr>
                            <td align="center" bgcolor="#667eea" background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" style="padding: 30px; color: #ffffff;">
                                <h1 style="margin: 0 0 15px 0; font-size: 28px; font-weight: bold; font-family: Arial, sans-serif;">
                                    ${title}
                                </h1>
                                <div style="margin-top: 10px; padding: 10px 15px; background: rgba(255, 255, 255, 0.15); border-radius: 20px; display: inline-block;">
                                    <span style="font-size: 14px; opacity: 0.9;">
                                        📅 ${date}
                                    </span>
                                </div>
                            </td>
                        </tr>

                        <!-- Content -->
                        <tr>
                            <td align="center" style="padding: 30px;">
                                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #ffffff;">
                                    <tr>
                                        <td align="left" style="padding-bottom: 25px;">
                                            <div style="color: #333333; font-size: 15px; line-height: 1.6; font-family: Arial, sans-serif;">
                                                ${content.replaceCRLFtoBR(text)}
                                            </div>
                                        </td>
                                    </tr>

                                    <!-- Tags -->
                                    ${
                                      tags.length > 0
                                        ? `
                                    <tr>
                                        <td align="left" style="padding-bottom: 25px; border-top: 1px solid #eeeeee; padding-top: 20px;">
                                            <div style="display: flex; flex-wrap: wrap; gap: 5px;">
                                                ${tags
                                                  .map(
                                                    (tag) => `
                                                    <span class="tag-badge">#${tag}</span>
                                                `
                                                  )
                                                  .join('')}
                                            </div>
                                        </td>
                                    </tr>
                                    `
                                        : ''
                                    }

                                    <!-- Signature -->
                                    <tr>
                                        <td align="left" style="padding: 20px 0 0 0; border-top: 1px solid #eeeeee;">
                                            <p style="margin: 10px 0 0 0; color: #333333; font-size: 15px; font-family: Arial, sans-serif; font-weight: bold;">
                                                С уважением,
                                            </p>
                                            <p style="margin: 0; color: #667eea; font-size: 15px; font-family: Arial, sans-serif; font-weight: bold;">
                                                Команда ZwiftPower.ru
                                            </p>
                                        </td>
                                    </tr>
                                </table>
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
                                                            zwiftId
                                                              ? `<a href="${serverFront}/profile/${zwiftId}/settings/notifications" style="color: #667eea; text-decoration: none; font-size: 12px; margin: 0; font-family: Arial, sans-serif;">
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
