var slider  = (function () {

    //private
    var flag = true,
        timerDuration = 4000, // задержка таймера
        timer = 0;

    return{
      init: function () {

        var _that = this;

        // создаём точки

        _that.createDots();

        //Включение авто переключения

        _that.autoSlide();

        $(".slider_controls-button").on("click", function (e) {
          e.preventDefault();

          var
            $this = $(this),
            slides = $this.closest('.slider').find('.slider_item'),
            activeSlide = slides.filter('.active'),
            nextSlide = activeSlide.next(),
            prevSlide = activeSlide.prev(),
            firstSlide = slides.first(),
            lastSlide = slides.last();

            _that.clearTimer(); //отчистим таймер

          if ($this.hasClass('slider_controls-button_next')) {

            if(nextSlide.length){
              _that.moveSlide(nextSlide, 'moveRight');
            } else {
              _that.moveSlide(firstSlide, 'moveRight');
            }

          } else {

            if(prevSlide.length){
              _that.moveSlide(prevSlide, 'moveLeft');
            } else {
              _that.moveSlide(lastSlide, 'moveLeft');
            }
          }
        });

        // клик по точкам

        $('.slider_dots-item').on("click", function (e) {
          e.preventDefault();

          var
              $this = $(this),
              dots = $this.closest('.slider_dots').find(".slider_dots-item"),
              activeDot = dots.filter(".active"),
              dot = $this.closest('.slider_dots-item'),
              curDotNum = dot.index(),
              direction = (activeDot.index() < curDotNum) ? 'moveRight' : "moveLeft",
              reqSlide = $this.closest('.slider').find('.slider_item').eq(curDotNum);

              _that.clearTimer();

              _that.moveSlide(reqSlide, direction)
        })
      },

      moveSlide: function(slide, direction){

        var
            _that = this,
            container = slide.closest('.slider'),
            slides = container.find('.slider_item'),
            activeSlide = slides.filter('.active'),
            slideWidth = slides.width(),
            duration = 500,
            reqCssPosition = 0,
            reqSlideStrafe = 0;

        if (flag){
          flag = false

          if (direction === "moveRight"){

            reqCssPosition = slideWidth;
            reqSlideStrafe = -slideWidth;
          } else if (direction === "moveLeft"){

            reqCssPosition = -slideWidth;
            reqSlideStrafe = slideWidth;
          }
          slide.css("left", reqCssPosition).addClass("inslide");

          var movableSlide = slides.filter(".inslide");

          activeSlide.animate({left: reqSlideStrafe}, duration);

          movableSlide.animate({left: 0}, duration, function () {
            var $this = $(this);

            slides.css('left', '0').removeClass('active')
            $this.toggleClass('inslide active');

            _that.setActiveDot(container.find('.slider_dots'))

            flag = true
          });
        }

      },
      createDots: function () {
        var
              _that = this,
              container = $(".slider"),
              dotMarkup = '<li class="slider_dots-item"> \
                            <a href="#" class="slider_dots-link"></a> \
                          </li>';

        container.each(function () {

          var
              $this = $(this),
              slides = $this.find(".slider_item"),
              dotsContainer = $this.find(".slider_dots");
          for (var i = 0; i < slides.length; i++) {
            dotsContainer.append(dotMarkup);
          }
          _that.setActiveDot(dotsContainer);
        })

      },

      setActiveDot: function (container) {
        var
            slides = container.closest(".slider_list-wrap").find(".slider_item");

      container
          .find(".slider_dots-item")
          .eq(slides.filter(".active").index())
          .addClass("active")
          .siblings()
          .removeClass("active");
      },

      autoSlide: function () {
        var _that = this;

        timer = setInterval(function () {
          var
              slides = $('.slider_list .slider_item'),
              activeSlide = slides.filter('.active'),
              nextSlide = activeSlide.next(),
              firstSlide = slides.first()

              if(nextSlide.length){
                _that.moveSlide(nextSlide, 'moveRight');
              } else {
                _that.moveSlide(firstSlide, 'moveRight');
              }

        },4000)
      },

      clearTimer: function () {
        if (timer){
          clearInterval(timer);
          this.autoSlide();
        }
      }
    }
}());

var acordion = (function () {

  //private

  return {
    init: function () {
      var _that = this;

      $('.acordion__item').on('click', function () {
        var $this = $(this),
            item = $this.closest(".acordion__item"),
            list = $this.closest('.acordion'),
            items = list.find('.acordion__item')
            inner = $('.acordion__inner'),
            content = $this.find('.acordion__inner-link'),
            otherContent = list.find('.acordion__inner-link'),
            duration = 300;

        if (!item.hasClass('Active')){
          items.removeClass('Active');
          item.addClass('Active');

          otherContent.slideUp(duration);
          content.stop(true).slideDown(duration);
        } else {
          item.removeClass('Active');
          content.stop(true).slideUp(duration);

        }

      })

    }
  }

}());

var checkbox = (function () {

  //private

  return {
    init: function () {
      $('[type="checkbox"]').change(function () {

        var sum = $('.technics-content-right-form-sum');

        if(this.checked){

          sum.text ((+sum.text() + +$(this).attr("value")).toFixed(3) )

        }else{

          sum.text ((+sum.text() - +$(this).attr("value")).toFixed(3) )

        }



      })
    }
  }

}());

var taskManager = (function () {

  //private

  return {
    init: function () {

      $('.taskManager-newTask-clear').on('click', function () {

        $('.taskManager-newTask-text').val("")

      });

      $('.taskManager-newTask-enter').on('click', function () {



        if(!$('.taskManager-newTask-text').val() == ""){

          var
                beforeNewTask = $('.taskManager-newTask'),
                newTask = document.createElement('div'),
                taskNum = '<span class="taskManager-task-number">' + ($('.taskManager-task').length + 1) + '.</span>',
                taskText ='<span class="taskManager-taks-text">' + $('.taskManager-newTask-text').val() + '</span>',
                taskEdit = '<img src="img/taskManager-edit.png" alt="" class="taskManager-task-edit">',
                taskDel = '<img src="img/taskManager-del.png" alt="" class="taskManager-taks-del">';

          newTask.setAttribute("class", "taskManager-task");
          newTask.innerHTML += taskNum;
          newTask.innerHTML += taskText;
          newTask.innerHTML += taskEdit;
          newTask.innerHTML += taskDel;

          beforeNewTask.before(newTask)

          $('.taskManager-newTask-text').val("")

        }

      });

      $('.taskManager').on("click", '.taskManager-task .taskManager-taks-del', function () {

        var
            $this = $(this),
            thatTask = $this.closest('.taskManager-task');

        thatTask.remove()


      });

      $('.taskManager').on("click", '.taskManager-task .taskManager-task-edit', function () {

        var
            $this = $(this),
            newInput = document.createElement('input'),
            editEnter = document.createElement('img'),
            thatTask = $this.prev(),
            thatTaskText = thatTask.text();

        newInput.setAttribute("type", "text");
        newInput.setAttribute("class", "edited-task");
        editEnter.setAttribute("src", "img/taskManager-enter.png");
        editEnter.setAttribute("class", "taskManager-task-edit-enter")
        thatTask.remove();
        $this.before(newInput);
        $this.before(editEnter);
        $('.edited-task').val(thatTaskText)
        $this.next().remove();
        $this.remove()

      });

      $('.taskManager').on("click", '.taskManager-task .taskManager-task-edit-enter', function () {

        var
            $this = $(this),
            input = $this.prev()
            editenText = input.val(),
            newTask = document.createElement('span'),
            newEdit = document.createElement('img'),
            newDel = document.createElement('img'),
            thatTask = $this.closest('.taskManager-task');

            newTask.setAttribute("class", "taskManager-taks-text");
            newTask.innerHTML = editenText;
            newEdit.setAttribute("class","taskManager-task-edit")
            newEdit.setAttribute("src", "img/taskManager-edit.png")
            newDel.setAttribute("class","taskManager-taks-del")
            newDel.setAttribute("src", "img/taskManager-del.png")
            input.before(newTask);
            input.remove();
            $this.remove();
            thatTask.append(newEdit)
                    .append(newDel)

      });

    }
  }

}());

$(document).ready(function(){
  if ($('.slider').length){
    slider.init();
  };
  if ($('.acordion').length){
    acordion.init();
  };
  if ($('[type="checkbox"]').length){
    checkbox.init();
  };
  if ($('.taskManager').length){
    taskManager.init();
  }
});
