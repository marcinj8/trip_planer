import gsap from 'gsap';

export const showAnimation = (element, duration = 0.25, dir = 'x') => {
    const tl = gsap.timeline();

    tl.to(element.current, {
        duration,
        [dir]: 0,
        opacity: 1,
        display: 'inline-block'
    })
}


export const hideAnimation = (element, duration = 0.25, dir = 'x') => {
    const tl = gsap.timeline();

    tl.to(element.current, {
        duration,
        [dir]: -150,
        opacity: 0,
        display: 'none'
    })
}