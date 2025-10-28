// import { TCriticalPowerBestEfforts } from '../types/model.interface';
// import { TFtpData, TCategoriesWithRange } from '../types/series.types';
// import { calculateRiderCategory } from './calculateRiderCategory';

// const categories: TCategoriesWithRange[] = [
//   {
//     label: 'A',
//     ftpRange: {
//       wattPerKg: { value: 4.2, operand: '>=' },
//       watt: { value: 250, operand: '>=' },
//       wattLogic: 'AND',
//     },
//     ranges: [
//       { interval: 300, wattPerKg: { value: 5.1, operand: '>=' } }, // 5 min CP
//     ],
//   },
//   {
//     label: 'B',
//     ftpRange: {
//       wattPerKg: { value: 3.36, operand: '>=' },
//       watt: { value: 200, operand: '>=' },
//       wattLogic: 'AND',
//     },
//     ranges: [{ interval: 300, wattPerKg: { value: 4.1, operand: '>=' } }],
//   },
//   {
//     label: 'C',
//     ftpRange: {
//       wattPerKg: { value: 2.63, operand: '>=' },
//       watt: { value: 150, operand: '>=' },
//       wattLogic: 'AND',
//     },
//     ranges: [{ interval: 300, wattPerKg: { value: 3.2, operand: '>=' } }],
//   },
//   {
//     label: 'D',
//     ftpRange: {
//       wattPerKg: { value: 2.63, operand: '<' },
//     },
//     ranges: [],
//   },
// ];

// describe('calculateRiderCategory', () => {
//   it('назначает категорию A при высоких FTP и CP', () => {
//     const riderFtp: TFtpData = { watt: 300, wattPerKg: 4.5 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 5.2, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('A');
//   });

//   it('назначает категорию A при низком FTP watt/kg но высоком  CP', () => {
//     const riderFtp: TFtpData = { watt: 250, wattPerKg: 4.1 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 5.2, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('A');
//   });

//   it('назначает категорию B при низком FTP watt для A, но высоком FTP watt/kg', () => {
//     const riderFtp: TFtpData = { watt: 249, wattPerKg: 4.3 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 5.2, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('B');
//   });

//   it('назначает категорию B при средних показателях', () => {
//     const riderFtp: TFtpData = { watt: 220, wattPerKg: 3.5 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 4.0, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('B');
//   });

//   it('назначает категорию C при средне-низких показателях', () => {
//     const riderFtp: TFtpData = { watt: 160, wattPerKg: 2.8 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 3.3, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('C');
//   });

//   it('назначает категорию C при низки абсолютных и высоких удельных ваттах FTP', () => {
//     const riderFtp: TFtpData = { watt: 199, wattPerKg: 3.36 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 4.3, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('C');
//   });

//   it('назначает категорию D при низких FTP', () => {
//     const riderFtp: TFtpData = { watt: 120, wattPerKg: 2.0 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 2.5, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('D');
//   });

//   it('назначает категорию D при высоких FTP ватт/гк, но низком FTP по ваттам ', () => {
//     const riderFtp: TFtpData = { watt: 120, wattPerKg: 3.2 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 2.5, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('D');
//   });

//   it('назначает категорию D при высоких FTP ватт, но низком FTP по ватт/гк ', () => {
//     const riderFtp: TFtpData = { watt: 200, wattPerKg: 2.2 };
//     const riderCPs: TCriticalPowerBestEfforts[] = [
//       { duration: 300, wattsKg: 2.5, watts: 0, cpLabel: '0' },
//     ];

//     const result = calculateRiderCategory({
//       riderCPs,
//       riderFtp,
//       categoriesWithRange: categories,
//     });
//     expect(result).toBe('D');
//   });
// });
