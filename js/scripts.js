// simple file include mechanism using jquery load
$.getScript("./js/loader.js");

// affix replacement
var toggleAffix = function(affixElement, scrollElement, wrapper) {
    /*  this will add the `affix` class to affixElement when 
        it reaches the top of viewport (or the bottom of scrollElement).
        initially affixElement should be position: static in CSS
    */
    var height = affixElement.outerHeight(),
        top = wrapper.offset().top;
    
    if (scrollElement.scrollTop() >= top){
        wrapper.height(height);
        affixElement.addClass("affix");
    }
    else {
        affixElement.removeClass("affix");
        wrapper.height('auto');
    }
};

var dataSet2 = [
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1991",
        "Percent": "5.636216227"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1992",
        "Percent": "5.559158966"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1993",
        "Percent": "5.667055309"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1994",
        "Percent": "5.784175528"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1995",
        "Percent": "5.919183644"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1996",
        "Percent": "5.981287656"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1997",
        "Percent": "6.062381094"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1998",
        "Percent": "6.265769314"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "1999",
        "Percent": "6.348120045"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2000",
        "Percent": "6.173934376"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2001",
        "Percent": "6.127711743"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2002",
        "Percent": "6.20284049"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2003",
        "Percent": "6.146441004"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2004",
        "Percent": "6.01312946"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2005",
        "Percent": "5.890686549"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2006",
        "Percent": "5.576644962"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2007",
        "Percent": "5.293444765"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2008",
        "Percent": "5.44631318"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2009",
        "Percent": "5.923653204"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2010",
        "Percent": "5.734991785"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2011",
        "Percent": "5.602624107"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2012",
        "Percent": "5.599875317"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2013",
        "Percent": "5.57054695"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2014",
        "Percent": "5.435012768"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2015",
        "Percent": "5.446447205"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2016",
        "Percent": "5.531032807"
    },
    {
        "Entity": "World",
        "Code": "OWID_WRL",
        "Year": "2017",
        "Percent": "5.485124383"
    }
];
var years = [];
var percents = [];
var countries = [];

/* when doc is ready use jQuery to activate 
/  various components and logic */
$(function(){

    // initialize wow.js to watch when animations are scrolled into view
    new WOW().init();
    
    // smooth scrolling to page sections
    $('a.page-scroll').bind('click', function(e) {
        var $ele = $(this);
        var href = $ele.attr('href');
        var navHeight = 60;
        if (href.indexOf('#')!=-1){
            var hash = href.substring(href.indexOf('#'),href.length);
            if (typeof $(hash).offset() != "undefined") {
                $('html, body').stop().animate({
                    scrollTop: ($(hash).offset().top - navHeight)
                }, 1100, 'easeInOutExpo');
                e.preventDefault();
            }
        }
    });
    
    // always close responsive nav after click
    $('#collapsingNavbar li>a:not("[data-toggle]")').click(function() {
        $('.navbar-toggler:visible').click();
    });

    // page preloader effect -- add preload class to body tag
    setTimeout(function(){
      $('.preload').addClass('showing').delay(800).queue(function(){
        $('.preload').removeClass('showing').removeClass('preload');
      });
    }, 1000);
    
    // populate content of dynamic modals
    $('.loaded-modal').on('show.bs.modal', function (e) {
       var $this = $(this);
       var $rt = $(e.relatedTarget);
       $this.find('.loaded-image').attr("src",$rt.data("image"));
       $this.find('.loaded-caption').html($rt.data("caption")||'');
    });
    
    // nav scrollspy to highlight active section
    $('body').scrollspy({
        target: '.fixed-top',
        offset: ($('.fixed-top').outerHeight(true))||10
    });
    
    // initialize any affix components to use toggleAffix
    $('.wrapper-affix [data-toggle="affix"]').each(function() {
        
        /*  add .wrapper-affix to the affixElement ie: navbar */
        var ele = $(this),
            wrapper = $('<div></div>');
        
        ele.before(wrapper);
        $(window).on('scroll', function() {
            toggleAffix(ele, $(this), wrapper);
        });
        
        // init
        toggleAffix(ele, $(window), wrapper);
    });
    
    // activate all popovers and toasts
    $('[data-toggle=popover]').popover();
    $('.toast').toast('show');

    // google maps popover    
    var $el = $('[data-map-popover]');
    var getStaticMap = function(opts) {
        var src = "https://maps.googleapis.com/maps/api/staticmap?",
            params = $.extend({
              key: 'AIzaSyCHLJ2Qre0Vpz5NkFfKXDYkWvF49cbP25o', //use your own key
              center: 'New York NY',
              zoom: 13,
              size: '500x300',
              maptype: 'roadmap',
              sensor: false
            }, opts),
            query = [];
        
        $.each(params, function(k, v) {
          query.push(k + '=' + encodeURIComponent(v));
        });
        
        src += query.join('&');
        return '<img src="' + src + '" />';
    };
    $el.each(function(){
       var $e = $(this);
       var l = $e.data("location");
       $e.popover({ 
            title: l, 
            content: getStaticMap({center:l}), 
            html:true, 
            trigger:'hover'
        }); 
    });


    /* Charts Stuff ************/
    
    // var ctx = document.getElementById('myChart');
    
    
    for(let i=0; i < dataSet.length; i++){
        var countryObj = dataSet[i];
        var country = countryObj.Entity;
        var year = countryObj.Year;
        if(!countries.includes(country)){
            countries.push(dataSet[i].Entity)
        }
        
        if(!years.includes(dataSet[i].Year)){
            years.push(year);
        }

    }

    var counter = 0;
    var firstCountryName = "United States";
    var countryChartData = queryCountryData([firstCountryName], dataSet);
    drawChart('line',years,countryChartData,'myChart');
    drawChart('radar',years,countryChartData,'radarChart');

    
    
    
    $('#addCountry').on('click',()=>{
        

        // setTimeout(()=>{
            var nextCountryName = countries[counter];
            var localData = dataSet;
            // console.log("nextCountryName: ", [nextCountryName], localData);
            countryChartData = countryChartData.concat(queryCountryData([nextCountryName], localData));
            drawChart('line',years,countryChartData,'myChart');
            drawChart('radar',years,countryChartData,'radarChart');
            // updateDataSet([nextCountryName]);
            counter++
        // }, 1200);

        
    });

    // document.getElementById('addCountry').addEventListener("click", addButtonClick(dataSet));

    // function addButtonClick(data) {
    //     var nextCountryName = countries[counter];
    //     console.log("nextCountryName: ", [nextCountryName], data, dataSet);
    //     var nextCountry = queryCountryData([nextCountryName], data);
    //     drawChart('line',years,nextCountry);
    //     updateDataSet([nextCountryName]);
    //     counter++
    // }

    function drawChart(type, label, dataArr, id){
        console.log("INSIDE CHART: ", dataArr, label, id, type);
        var ctx = document.getElementById(id);
        var myChart = new Chart(ctx, {
            type: type,
            data: {
                labels: label,
                datasets: dataArr
            },
        });
    }
    // var myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: years,
    //         datasets: firstCountry
    //     }
    // });
        // const $tableID = $('#table');
        // const $BTN = $('#export-btn');
        // const $EXPORT = $('#export');

        // const newTr = `
        //     <tr class="hide">
        //     <td class="pt-3-half" contenteditable="true">Example</td>
        //     <td class="pt-3-half" contenteditable="true">Example</td>
        //     <td class="pt-3-half" contenteditable="true">Example</td>
        //     <td class="pt-3-half" contenteditable="true">Example</td>
        //     <td class="pt-3-half" contenteditable="true">Example</td>
        //     <td class="pt-3-half">
        //         <span class="table-up"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-up" aria-hidden="true"></i></a></span>
        //         <span class="table-down"><a href="#!" class="indigo-text"><i class="fas fa-long-arrow-alt-down" aria-hidden="true"></i></a></span>
        //     </td>
        //     <td>
        //         <span class="table-remove"><button type="button" class="btn btn-danger btn-rounded btn-sm my-0 waves-effect waves-light">Remove</button></span>
        //     </td>
        //     </tr>`;

        
        // console.log("DATASET: ", $('.table-add'));
        
        // $('.table-add').on('click', 'i', () => {

        //     const $clone = $tableID.find('tbody tr').last().clone(true).removeClass('hide table-line');

        //     if ($tableID.find('tbody tr').length === 0) {

        //         $('tbody').append(newTr);
        //     }

        //     $tableID.find('table').append($clone);
        // });

        // $tableID.on('click', '.table-remove', function () {

        //     $(this).parents('tr').detach();
        // });

        // $tableID.on('click', '.table-up', function () {

        //     const $row = $(this).parents('tr');

        //     if ($row.index() === 0) {
        //         return;
        //     }

        //     $row.prev().before($row.get(0));
        // });

        // $tableID.on('click', '.table-down', function () {

        //     const $row = $(this).parents('tr');
        //     $row.next().after($row.get(0));
        // });

        // // A few jQuery helpers for exporting only
        // jQuery.fn.pop = [].pop;
        // jQuery.fn.shift = [].shift;

        // $BTN.on('click', () => {

        //     const $rows = $tableID.find('tr:not(:hidden)');
        //     const headers = [];
        //     const data = [];

        //     // Get the headers (add special header logic here)
        //     $($rows.shift()).find('th:not(:empty)').each(function () {

        //         headers.push($(this).text().toLowerCase());
        //     });

        //     // Turn all existing rows into a loopable array
        //     $rows.each(function () {
        //         const $td = $(this).find('td');
        //         const h = {};

        //         // Use the headers from earlier to name our hash keys
        //         headers.forEach((header, i) => {

        //             h[header] = $td.eq(i).text();
        //         });

        //         data.push(h);
        //     });

        //     // Output the result
        //     $EXPORT.text(JSON.stringify(data));
        // });

        /******** END */
        // $('.js-example-basic-multiple').select2();
});

function getCountryDataSet(country, data) { //Get the country % from dataSet
    var percents = [];
    // console.log('getCountryDataSet: ', country, data);

    for(let i=0; i < data.length; i++){
        var countryObj = data[i];
        if(country === countryObj.Entity){
            var number = countryObj.Percent;
            // var percent = addSym(number, '%');
            var rounded = round(number, 2);
            percents.push(rounded);
        }

    } 
    
    return percents;
};

const round = (x, n) => 
    Number(parseFloat(Math.round(x * Math.pow(10, n)) / Math.pow(10, n)).toFixed(n));


const addSym = (n, str) => {return (n+str)}


function queryCountryData (countryArray, data) {
    var countryData = [];
    // console.log('queryCountryData: ', countryArray, data.length);
    if(countryArray.length > 1) {
      countryArray.forEach(element => {
        countryData.push(getCountryDataSet(element, data));

      });  
    }else {
        countryData.push(
            {
                label: countryArray[0],
                data: getCountryDataSet(countryArray[0], data),
                fill: false,
                backgroundColor: '#'+Math.floor(Math.random()*16777215).toString(16),
                borderColor: '#'+Math.floor(Math.random()*16777215).toString(16)
            }
        
        );

    }

    return countryData;
}

function removeCountryFromList(countryArray) {
    var newArray;
    countryArray.forEach(element => {
        
        newArray = dataSet.filter(e => {
            e.Entity !== element
            console.log('E: ', e);
        
        });
        
    });
    console.log('removeCountryFromList: ', countryArray, newArray);
    return newArray;
}

function updateDataSet(countryArray) {
    return removeCountryFromList(countryArray);
    // console.log('NEW DATASET: ', dataSet);
}

