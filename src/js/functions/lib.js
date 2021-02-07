export const random = (min = 0, max = 1) => {
    return Math.random() * (max - min) + min;
};

export const loadImage = url => {
    return new Promise((response, reject) => {
        const image = new Image();
        image.addEventListener('load', e => response(image));
        image.addEventListener('error', e => reject(event));
        image.setAttribute('src', url);
        if(image.complete) {
            response(image);
        }
    });
};

export const map = (value, istart, istop, ostart, ostop) => {
    return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

