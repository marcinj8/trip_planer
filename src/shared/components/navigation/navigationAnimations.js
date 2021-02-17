import gsap from 'gsap';

export const openSideBar = ref => {
    const tl = gsap.timeline();
    const animatedElement = ref.current;

    tl.to(animatedElement, {
        x: 0,
        opacity: 1,
        duration: .25,
        ease: "expo.out",
    })
        .to(animatedElement,
            {
                boxShadow: '11px 11px 5px rgba(50, 50, 50, 0.75)',
                duration: .15,
            })
}

export const hideSideBar = ref => {
    const tl = gsap.timeline();
    const animatedElement = ref.current;

    tl.to(animatedElement, {
        x: '-100%',
        opacity: 0,
        duration: .4,
        boxShadow: 'none'
    })
}