import gsap from 'gsap';

export const showItem = (itemRef, delay, imageRef, descriptionRef) => {
    const tl = gsap.timeline();

    const element = itemRef.current;
    const image = imageRef ? imageRef.current : element.children[0].children;
    const description = descriptionRef ? descriptionRef.current : element.children[1].children[0].children;

    tl.to(element, {
        delay: delay * 0.15,
        duration: .5,
        y: 0,
        opacity: 1,
        ease: "back.out(3)"
    });
    tl.from(image, {
        duration: .4,
        scale: .3,
        ease: "back.out(2)"
    }, "-=0.4");
    tl.from(description, {
        duration: .3,
        x: -10,
        opacity: 0,
        stagger: .1
    })

}