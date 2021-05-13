import gsap from 'gsap';

export const showModalAnimaton = (ref, duration = 0.3 ) => {
    const element = ref.current;
    const tl = gsap.timeline();

    tl.to(element, {
        duration,
        opacity: 1,
        y: 0,
        ease: 'back.out(1.1)',
    })
}

export const closeModalAnimaton = (ref, duration = 0.25 ) => {
    const element = ref.current;
    const tl = gsap.timeline();

    tl.to(element, {
        duration,
        opacity: 0,
        y: '-100vh',
    })
}