import gsap from 'gsap';

export const showModalAnimaton = ref => {
    const element = ref.current;
    const tl = gsap.timeline();

    tl.to(element, .3, {
        opacity: 1,
        y: '0',
        ease: 'back.out(.8)'
    })
}

export const closeModalAnimaton = ref => {
    const element = ref.current;
    const tl = gsap.timeline();

    tl.to(element, .15, {
        opacity: 0,
        y: '-250%'
    })
}