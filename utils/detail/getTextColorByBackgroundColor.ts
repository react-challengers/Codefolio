/**
 *
 * @param hexColor 16진수 색상값
 * @returns {number} 0: 검정색, 255: 흰색
 * @see http://yoonbumtae.com/?p=2977
 */

const getTextColorByBackgroundColor = (hexColor: string) => {
  const colorToNumber = hexColor.substring(1); // 색상 앞의 # 제거
  const rgb = parseInt(colorToNumber, 16); // hexColor를 10진수로 변환

  // eslint-disable-next-line no-bitwise
  const r = (rgb >> 16) & 0xff; // red 추출
  // eslint-disable-next-line no-bitwise
  const g = (rgb >> 8) & 0xff; // green 추출
  // eslint-disable-next-line no-bitwise
  const b = (rgb >> 0) & 0xff; // blue 추출

  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
};

export default getTextColorByBackgroundColor;
