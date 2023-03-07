import globalInfos from '../utils/constant';
export  const DataStore = (function () {
    let leftBorder = globalInfos.LEFT_MARGIN;
    let rightBorder = 0;
    let bottomBorder = 0;
    return {
        setLeft(left) {
            if(left < leftBorder) {
                leftBorder = left;
            }
        },
        setRight(right) {
            if(right > rightBorder) {
                rightBorder = right;
            }

        },
        setBottom(bottom) {
            if(bottom > bottomBorder) {
                bottomBorder = bottom;
            }

        },
        getLeft() {
            return leftBorder;
        },
        getRight() {
            return rightBorder;
        },
        getBottom() {
            return bottomBorder;
        },
        reset() {
            leftBorder = globalInfos.LEFT_MARGIN;
            rightBorder = 0;
            bottomBorder = 0;
        }
    };
})();