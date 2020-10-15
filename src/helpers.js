import Vue from "vue";

export function isObject(something) {
  return typeof something === 'object' && something !== null;
}

export function emptyReactiveObject(obj) {
  Object.keys(obj).forEach(function (prop) {
    Vue.delete(obj, prop);
  });
}

export function emptyObject(obj) {
  //Object keys only goes through the enumerable properties
  Object.keys(obj).forEach(function (prop) {
    delete obj[prop];
  });
}

export function emptyArray(arr) {
  // also works for reactive arrays
  arr.splice(0,arr.length);
  // arr.length = 0 // alternative
}

export function throttled(delay, fn) {
  //that's nothing more than a closure construct
  let lastCall = 0;
  return function (...args) { //all other parameters except delay and fn (those, that haven't been assigned)
    //console.log('throttled ', lastCall);
    const now = (new Date).getTime();
    if (now - lastCall < delay) {
      return;
    }
    lastCall = now;
    return fn(...args);
  }
}

export function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length) {
      return false;
    }
    for(let i = arr1.length-1; i >= 0; i--) {
        if(arr1[i] !== arr2[i]) {
          return false;
        }
    }
    return true;
}

export function arrayAverage(arr) {
  if(!arr.length) {
    return 0;
  }
  // for loop is faster than reduce()
  var sum = 0;
  for(var i=0, n=arr.length; i < n; i++) {
    sum += arr[i];
  }
  return sum/arr.length;
}

export function multiplyArrayByScalar(a,s) {
  for(let i=0, len=a.length; i<len; i++) {
    a[i] *= s;
  }
}

export function triggerWindowResize() {
  //window.dispatchEvent(new Event('resize'));
  //version that also works in IE:
  // window.requestAnimationFrame(()=>{
  //   window.requestAnimationFrame(()=>{
  //     var resizeEvent = window.document.createEvent('UIEvents');
  //     resizeEvent .initUIEvent('resize', true, false, window, 0);
  //     window.dispatchEvent(resizeEvent);
  //   });
  // });
  //

  window.requestAnimationFrame(()=>{
    var resizeEvent = window.document.createEvent('UIEvents');
    resizeEvent .initUIEvent('resize', true, false, window, 0);
    window.dispatchEvent(resizeEvent);
  });

}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
// immediate is not working as expected!
export function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}


// function randomArrayGenerator(min, max) {
//   var res = [];
//   for(let i=0; i<33; i++) {
//     res[i] = getRandomIntInclusive(min*(i+10)/110*10,max*i/110*10);
//   }
//   //console.log(JSON.stringify(res));
// }
//
//
// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min +1)) + min;
// }
