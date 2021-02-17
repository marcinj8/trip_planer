import gsap from 'gsap';

export const showUserSharedBox = ref => {
    const tl = gsap.timeline();

    tl.to(ref.current, .25, {
        opacity: 1,
        display: 'block'
    })
}

export const hideUserSharedBox = ref => {
    const tl = gsap.timeline();

    tl.to(ref.current, .25, {
        opacity: 0,
        display: 'none',
    })
}