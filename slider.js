class Slider {
    constructor(selector, options) {
        this.slider = this.find1(selector)
        this.slides = this.slider.querySelectorAll(options.slides);
        this.autoPlay = options.autoPlay || null;
        this.firstDelay = options.firstDelay || 0;
        this.loop = options.loop || false;
        this.ctrls = options.controlls || null;
        this.nav = options.navigation || null;
        this.current = 0;
        this.gap = options.gap || 0;
        this.interval = null;
        return this;
    }
    start() {
        this.slider.style.gap = `${this.gap}px`;
        this.slider.style.scrollBehavior = 'smooth';
        this.slider.style.dir = this.dir;
        setTimeout(() => {
            if (this.autoPlay) {
                this.delay = this.autoPlay.delay || 1000;
                this.automate(this.delay)
            }
            if (this.ctrls) {
                this.ctrls.pervBtn = this.find1(this.ctrls.perv) || null;
                this.ctrls.nextBtn = this.find1(this.ctrls.next) || null;
                this.useCtrls(this.ctrls.pervBtn, this.ctrls.nextBtn)
            }
            if (this.nav) {
                this.navItems = this.findAll(this.nav.items)
                this.activation = this.nav.activation
                this.useNav(this.navItems)
            }
            this.goTo(this.current)
        }, this.firstDelay);
        return this
    }
    automate(delay) {
        this.interval = setInterval(() => {
            if (!this.loop && this.current == this.slides.length - 1) clearInterval(this.interval)
            else if (this.loop && this.current == this.slides.length - 1) this.goTo(0)
            else this.next()
        }, delay);
    }
    next() {
        if (this.current !== this.slides.length - 1) this.goTo(++this.current)
        else if (this.loop) this.goTo(0)
    }
    perv() {
        if (this.current !== 0) this.goTo(--this.current)
        else if (this.loop) this.goTo(this.slides.length - 1)
    }
    goTo(i) {
        const w = this.slides[i].offsetWidth;
        this.slider.scrollLeft = (w + this.gap) * i;
        this.current = i
        if (this.nav) this.activeItem(i)
    }
    useCtrls(pervBtn, nextBtn) {
        this.click(pervBtn, () => this.perv())
        this.click(nextBtn, () => this.next())
    }
    useNav(items) {
        for (let i = 0; i < this.slides.length; i++) {
            this.click(items[i], () => this.goTo(i))
        }
    }
    activeItem(n) {
        const items = this.navItems;
        for (let i = 0; i < items.length; i++) {
            items[i].classList.remove(this.activation)
        }
        items[n].classList.add(this.activation)
    }
    click(el, cb) { el.addEventListener('click', cb) }
    find1(id) { return document.querySelector(id) }
    findAll(clas) { return document.querySelectorAll(clas) }
}