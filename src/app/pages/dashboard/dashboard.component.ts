import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';

declare var $: any;

function getChildElements (element) {
  return element['nativeElement'];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  slides: any = {
    element: null,
    slide: null,
    count: null,
    animEffectsOut: ['moveUpOut','moveDownOut','slideUpOut','slideDownOut','slideLeftOut','slideRightOut'],
    animEffectsIn: ['moveUpIn','moveDownIn','slideUpIn','slideDownIn','slideLeftIn','slideRightIn'],
    current: 0,
    navDots: null,
    navDotsArray: [],
    isAnimating: false
  };

  constructor() { }

  ngOnInit() {
    
  }

  @ViewChild("slideshow", {static: false}) slideshow: ElementRef;

  /**
   * Initialize function
   */
  init(): void{
    this.addNavigation();
		this.initEvents();
  }

  /**
   * Add the navigation at the bottom
   */
  addNavigation(): void{
    this.slides.navDots = document.createElement('nav');
    let inner = '';

    for (let i = 0; i < this.slides.count; i++) {
      inner += i === 0 ? '<span class="current"></span>' : '<span></span>';
    }

    this.slides.navDots.innerHTML = inner;
    this.slides.element.appendChild(this.slides.navDots);
    this.slides.navDotsArray = [].slice.call( this.slides.navDots.children );
  }

  /**
   * Events binding for the dots
   */
  initEvents(): void {
    this.slides.navDotsArray.forEach((navDot, index)=>{
      navDot.addEventListener('click', (event)=>{
        if (index != this.slides.current) {
          this.showItem(index);
        }
      });
    });
  }

  /**
   * Toggles the slides 
   */
  showItem(index: number): boolean {

    if (this.slides.isAnimating) {
      return false;
    }

    this.slides.isAnimating = true;

    $(this.slides.navDotsArray[this.slides.current]).removeClass('current');

    var currentSlide = this.slides.slide[this.slides.current];
    
    // Updating the current position
    this.slides.current = index;

    // Getting the next slide and out & in effects
    var nextSlide = this.slides.slide[this.slides.current],
        outEffect = this.slides.animEffectsOut[ Math.floor( Math.random() * this.slides.animEffectsOut.length ) ],
        inEffect = this.slides.animEffectsIn[ Math.floor( Math.random() * this.slides.animEffectsOut.length ) ];

    currentSlide.setAttribute('data-effect-out', outEffect);
    nextSlide.setAttribute('data-effect-in', inEffect);
    
    $(this.slides.navDotsArray[this.slides.current]).addClass('current');

    let cntAnims = 0, self = this,
        // No. of element in current slide
        animElementCurrentCount = currentSlide.querySelector( '.tiltview' ).children.length,
        // No. of element in next slide
        animElementNextCount = nextSlide.querySelector( '.tiltview' ).children.length,
        // No. of animation completed
        animEndCurrentCount = 0,
        animEndNextCount = 0,
        // end of each animation
        isFinished = function () {
          ++cntAnims;
          if (cntAnims === 2) {
            self.slides.isAnimating = false;
          }
        },
        // end of current animation
        onEndAnimationCurrentItem = function() {
          ++animEndCurrentCount;
          var endFn = function() {
            $(currentSlide).removeClass('hide');
            $(currentSlide).removeClass('current');
            isFinished();
          };

          if( animEndCurrentCount === animElementCurrentCount ) {
            currentSlide.removeEventListener( 'animationend', onEndAnimationCurrentItem );
            endFn();
          }
        },
        onEndAnimationNextItem = function() {
          ++animEndNextCount;
          var endFn = function() {
            $(nextSlide).removeClass('show');
            $(nextSlide).addClass('current');
            isFinished();
          };

          if( animEndNextCount === animElementNextCount ) {
            nextSlide.removeEventListener( 'animationend', onEndAnimationNextItem );
            endFn();
          }
        };

        $(currentSlide).addClass('hide');
        $(nextSlide).addClass('show');

        currentSlide.addEventListener('animationend', onEndAnimationCurrentItem);
        nextSlide.addEventListener('animationend', onEndAnimationNextItem);

  }

  /**
   * Called after fully initialized a component's view
   */
  ngAfterViewInit(): void{
    this.slides.element = document.getElementById('slideshow');
    this.slides.slide = getChildElements(this.slideshow).querySelector( 'ol.slides' ).children;
    this.slides.count = this.slides.slide.length;
    if (!this.slides.count) {
      return;
    }
    this.init();
  }

}
