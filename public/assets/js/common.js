$(() => {
    $( document ).ready(function() {
        $('.custom-bg').hide();
        $('.main-footer').hide();
        setTimeout(function() {
            $('.custom-bg').show();
            $('.main-footer').show();
            $('.loader').hide(); 
        }, 250);
        let initData;
        setTimeout(function(){ 
            initData = $('form').serialize();
        }, 300);
        // prevent admin-panel back button if any formdata is channged
        $('.backButton').on('click', (event) => {
            event.preventDefault();
            if(initData) {
                let currentData = $('form').serialize();
                const redirectLocation = window.location.origin + $('.backButton').attr('href');
                $('.redirect-page').attr("href", redirectLocation);
                if(initData==currentData) {
                    window.location.href = redirectLocation;
                } else {
                    $('#redirectConfirmationModal').modal('show');
                } 
            }
        });
        
        // prevent browser back button if any formdata is channged
        history.pushState({}, '');
        $(window).on('popstate', function(event) {
            const backHref = $('.backButton').attr('href');
            event.preventDefault();
            let currentData = $('form').serialize();
            let redirectLocation;
            if( backHref !== 'undefined' && typeof backHref !== 'undefined' ) {
                redirectLocation = window.location.origin + backHref;
            } else {
                redirectLocation = window.location.origin + '/' + backHref;
            }
            $('.redirect-page').attr("href", redirectLocation);
            if(initData==currentData) {
                window.location.href = redirectLocation;
                return;
            } else {
                $('#redirectConfirmationModal').modal('show');
            }
            history.pushState({}, ''); 
        })
    });

    // LOGOUT WHEN TIMEZONE IS CHANGED
    const retrievedTimezone = localStorage.getItem('timezone');
    const currentTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (retrievedTimezone !== currentTimezone) {
        localStorage.setItem('timezone', currentTimezone);
        window.alert('Logout! \nAs your timezone changed from "' +  retrievedTimezone + '" to "' + currentTimezone + '"');
        window.location.href = "/admin/logout"
    }

    // $('.custom-bg').hide();
    // $('.main-footer').hide();
    // $( document ).ready(function() {
    //     $('.custom-bg').show();
    //     $('.main-footer').show();
    //     $('.loader').hide(); 
    // });
    window.onscroll = () => { 
        myFunction();
    };

    var header = document.getElementById("custom-header");
    var sticky;
    if(header) {
        sticky = header.offsetTop;
    }

    (function(a){(jQuery.browser=jQuery.browser||{}).mobile=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);

    function myFunction() {
    if (window.pageYOffset > sticky && !jQuery.browser.mobile) {
        if (header && header.classList) {
            header.classList.add("sticky");
        }
        $('.custom-flex').addClass("sticky-custom-flex");
        $('.custom-add-box').addClass("sticky-custom-add-box");
        $('.submit-row').addClass("sticky-submit-row");
        $('.custom-save-btn').addClass("sticky-submit-btn");
        $('.custom-cancel-btn').addClass("sticky-cancel-btn");
        $('.custom-add-heading').addClass("sticky-create-header");
        $('.custom-add-heading-details').addClass("sticky-create-header-details");
        $('.custom-add-btn').addClass("sticky-add-btn");
        $('.import-excel').addClass("sticky-import-excel");
        $('.sample-excel').addClass("sticky-sample-excel");
        $('.ex-imp').addClass("sticky-import-na");
        $('.post-imp').addClass("sticky-import-post");
        $('.ca-imp').addClass("sticky-import-ca");
        $('.sa-imp').addClass("sticky-import-sa");
        $('.cha-imp').addClass("sticky-import-cha");
        $('.spa-imp').addClass("sticky-import-spa");
        $('.spl-imp').addClass("sticky-import-spl");
        $('.ins-imp').addClass("sticky-import-ins");
        $('.cls-imp').addClass("sticky-import-cls");
        $('.ps-imp').addClass("sticky-import-ps");
        $('.ts-imp').addClass("sticky-import-ts");
        $('.pl-imp').addClass("sticky-import-pl");
        $('.shl-imp').addClass("sticky-import-shl");
        $('.ex-sam').addClass("sticky-sample-na");
        $('.vp-ex-imp').addClass("sticky-import-vp");
        $('.vp-ex-sam').addClass("sticky-sample-vp");
        $('.ca-ex-sam').addClass("sticky-sample-ca");
        $('.sa-ex-sam').addClass("sticky-sample-sa");
        $('.cha-ex-sam').addClass("sticky-sample-cha");
        $('.spa-ex-sam').addClass("sticky-sample-spa");
        $('.spl-ex-sam').addClass("sticky-sample-spl");
        $('.ins-ex-sam').addClass("sticky-sample-ins");
        $('.cls-ex-sam').addClass("sticky-sample-cls");
        $('.ps-ex-sam').addClass("sticky-sample-ps");
        $('.ts-ex-sam').addClass("sticky-sample-ts");
        $('.pl-ex-sam').addClass("sticky-sample-pl");
        $('.shl-ex-sam').addClass("sticky-sample-shl");
        $('.vu-ex-imp').addClass("sticky-import-vu");
        $('.vu-ex-sam').addClass("sticky-sample-vu");
        $('.su-ex-imp').addClass("sticky-sample-su");
        $('.ex-sam-ap').addClass("sticky-sample-sp");
        $('.pd-ex-sam').addClass("sticky-sample-pd");
        $('.report-ex').addClass("sticky-report");
        $('.report-ca').addClass("sticky-country-report");
        $('.report-sa').addClass("sticky-state-report");
        $('.report-spa').addClass("sticky-speciality-report");
        $('.report-spl').addClass("sticky-specialization-report");
        $('.report-cha').addClass("sticky-chip-report");
        $('.report-ins').addClass("sticky-insurer-report");
        $('.report-cls').addClass("sticky-classification-report");
        $('.report-ps').addClass("sticky-practice-service-report");
        $('.report-ts').addClass("sticky-therapist-service-report");
        $('.report-pl').addClass("sticky-practitioner-liability-report");
        $('.report-pl-fix').removeClass("sticky-practitioner-liability-report-fix");
        $('.report-shl').addClass("sticky-symptoms-how-long-report");
        $(".fav-report-ex").addClass("sticky-fav-report-ex");
        
        $('.spa-imp').addClass("spa-imp-prr");
        $('.spa-ex-sam').addClass("spa-ex-prr");
        $('.report-spa').addClass("report-prr");
        $('.download-post').addClass("download-post-sticky");
        $('.sample-post').addClass("sample-post-sticky");
        $('.post-sam').addClass("post-sam-sticky");
    } else {
        if (header && header.classList) {
            header.classList.remove("sticky");
        }
        $('.custom-flex').removeClass("sticky-custom-flex");
        $('.custom-add-box').removeClass("sticky-custom-add-box");
        $('.submit-row').removeClass("sticky-submit-row");
        $('.custom-save-btn').removeClass("sticky-submit-btn");
        $('.custom-cancel-btn').removeClass("sticky-cancel-btn");
        $('.custom-add-heading').removeClass("sticky-create-header");
        $('.custom-add-heading-details').removeClass("sticky-create-header-details");
        $('.custom-add-btn').removeClass("sticky-add-btn");
        $('.import-excel').removeClass("sticky-import-excel");
        $('.sample-excel').removeClass("sticky-sample-excel");
        $('.ex-imp').removeClass("sticky-import-na");
        $('.post-imp').removeClass("sticky-import-post");
        $('.ca-imp').removeClass("sticky-import-ca");
        $('.sa-imp').removeClass("sticky-import-sa");
        $('.cha-imp').removeClass("sticky-import-cha");
        $('.spa-imp').removeClass("sticky-import-spa");
        $('.spl-imp').removeClass("sticky-import-spl");
        $('.ins-imp').removeClass("sticky-import-ins");
        $('.cls-imp').removeClass("sticky-import-cls");
        $('.ps-imp').removeClass("sticky-import-ps");
        $('.ts-imp').removeClass("sticky-import-ts");
        $('.pl-imp').removeClass("sticky-import-pl");
        $('.shl-imp').removeClass("sticky-import-shl");
        $('.ex-sam').removeClass("sticky-sample-na");
        $('.vp-ex-imp').removeClass("sticky-import-vp");
        $('.vp-ex-sam').removeClass("sticky-sample-vp");
        $('.ca-ex-sam').removeClass("sticky-sample-ca");
        $('.sa-ex-sam').removeClass("sticky-sample-sa");
        $('.cha-ex-sam').removeClass("sticky-sample-cha");
        $('.spa-ex-sam').removeClass("sticky-sample-spa");
        $('.spl-ex-sam').removeClass("sticky-sample-spl");
        $('.ins-ex-sam').removeClass("sticky-sample-ins");
        $('.cls-ex-sam').removeClass("sticky-sample-cls");
        $('.ps-ex-sam').removeClass("sticky-sample-ps");
        $('.ts-ex-sam').removeClass("sticky-sample-ts");
        $('.pl-ex-sam').removeClass("sticky-sample-pl");
        $('.shl-ex-sam').removeClass("sticky-sample-shl");
        $('.vu-ex-imp').removeClass("sticky-import-vu");
        $('.vu-ex-sam').removeClass("sticky-sample-vu");
        $('.su-ex-imp').removeClass("sticky-sample-su");
        $('.ex-sam-ap').removeClass("sticky-sample-sp");
        $('.pd-ex-sam').removeClass("sticky-sample-pd");
        $('.report-ex').removeClass("sticky-report");
        $('.report-ca').removeClass("sticky-country-report");
        $('.report-sa').removeClass("sticky-state-report");
        $('.report-spa').removeClass("sticky-speciality-report");
        $('.report-spl').removeClass("sticky-specialization-report");
        $('.report-cha').removeClass("sticky-chip-report");
        $('.report-ins').removeClass("sticky-insurer-report");
        $('.report-cls').removeClass("sticky-classification-report");
        $('.report-ps').removeClass("sticky-practice-service-report");
        $('.report-ts').removeClass("sticky-therapist-service-report");
        $('.report-ps').removeClass("sticky-practitioner-liability-report");
        $('.report-pl-fix').addClass("sticky-practitioner-liability-report-fix");
        $('.report-shl').removeClass("sticky-symptoms-how-long-report");
        $(".fav-report-ex").removeClass("sticky-fav-report-ex");
        $('.spa-imp').removeClass("spa-imp-prr");
        $('.spa-ex-sam').removeClass("spa-ex-prr");
        $('.report-spa').removeClass("report-prr");
        $('.download-post').removeClass("download-post-sticky");
        $('.post-sam').removeClass("post-sam-sticky");
        $('.sample-post').removeClass("sample-post-sticky");
    }
    }
});

function customDate(utcDate) {
    let date = new Date(utcDate)
                    .toLocaleString("en-us", {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour12: false,
                    hour: '2-digit', 
                    minute: '2-digit',
                    }).split(", ");
let day = parseInt(date[0].split(" ")[1]);
const nth = function(day) {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
    case 1:  return "st";
    case 2:  return "nd";
    case 3:  return "rd";
    default: return "th";
    }
}
return date[0] + nth(day) + " " + date[1] + " " + date[2];
}