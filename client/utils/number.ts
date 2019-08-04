/**
 * 千分符格式化
 * @param num - 数字
 * @returns - 格式化结果
 */
export const thousandth = (num: number): string | 0 => {
    return (
        num &&
        num.toString().replace(/\d+/, function (s) {
            return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        })
    );
};
