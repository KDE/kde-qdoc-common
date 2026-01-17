"use strict";

function load_sdk(s, id, src) {
    var js, fjs = document.getElementsByTagName(s)[0];
    if (document.getElementById(id)) return;
    js = document.createElement(s);
    js.id = id;
    js.src = src;
    fjs.parentNode.insertBefore(js, fjs);
}
$(document).ready(function($) {
    if (document.documentElement.clientWidth < 1280) {
        oneQt.extraLinksToMain();
    }

    $('#menuextras .search').click(function(e){
        e.preventDefault();
        $('.big_bar.account').slideUp();
        $('.big_bar.search').slideToggle();
        $('.big_bar_search').focus();
        $(this).toggleClass('open');
    });

    Modernizr.load({test: Modernizr.input.placeholder,
                    nope: wpThemeFolder + '/js/placeholders.min.js'});

    $('#navbar .navbar-toggle').click(function(e) {
        e.preventDefault();
        if ($(this).hasClass('opened')) {
            $(this).removeClass('opened');
            $('#navbar .navbar-menu').css('max-height', '0px');
        }
        else {
            $(this).addClass('opened');
            $('#navbar .navbar-menu').css('max-height', $('#navbar .navbar-menu ul').outerHeight() + 'px');
        }
    });

    $(window).resize(function() {
        oneQt.stickySidebar();
        oneQt.footerPosition();
        if (document.documentElement.clientWidth < 1280) {
            oneQt.extraLinksToMain();
        } else {
            oneQt.mainLinkstoExtra();
        }
    });

    $(window).scroll(function() {
        oneQt.stickySidebar();
        oneQt.stickyHeader();
    });

    oneQt.stickySidebar();
    oneQt.footerPosition();
    oneQt.tabContents();
});

var oneQt = {
    stickySidebar: function() {
        if ($('#sidebar').length && $('#sidebar').outerHeight() > 20) {
            var $sidebar = $('#sidebar');
            var $win = $(window);
            var $sidebarContainer = $sidebar.parent();
            var headerHeight = $('#navbar').outerHeight();
            if ($win.outerHeight() - headerHeight > $sidebar.innerHeight() &&
                    $win.scrollTop() > $sidebarContainer.offset().top) {
                var newTop = headerHeight + $win.scrollTop() - $sidebarContainer.offset().top;
                if (newTop + $sidebar.innerHeight() > $sidebarContainer.innerHeight())
                    newTop = $sidebarContainer.innerHeight() - $sidebar.innerHeight();

                $sidebar.css({top: newTop +'px'})
            }
            else {
                $sidebar.css({top: '0'})
            }
        }
    },

    footerPosition: function () {
        $('#footerbar').removeClass('fixed');
        if (($('.hbspt-form').length > 0) || ($('#customerInfo').length > 0) || ($('.purchase_bar').length > 0)) {
            var footerBottomPos = $('#footerbar').offset().top + $('#footerbar').outerHeight();
            if (footerBottomPos < $(window).height())
                $('#footerbar').addClass('fixed');
        }
    },

    stickyHeader: function () {
        var originalHeaderHeight = 79;
        if ($(window).scrollTop() > originalHeaderHeight) {
            $('#navbar').addClass('fixed');
            $('#bottom_header').fadeOut();
        }
        else {
            $('#navbar').removeClass('fixed');
            $('#bottom_header').fadeIn();
        }
    },

    tabContents: function () {
        $('.tab-container').each(function(i) {
            var $el = $(this);
            $el.find('.tab-titles li:eq(0)').addClass('active');
            $el.find('.tab-contents .tab:eq(0)').addClass('active');
            $el.find('.tab-titles a').click(function(e) {
                e.preventDefault();
                var index = $(this).parent().index();
                $el.find('.tab-titles li').removeClass('active');
                $el.find('.tab-contents .tab').removeClass('active');
                $(this).parent().addClass('active');
                $el.find('.tab-contents .tab').eq(index).addClass('active');
            })
        });
    },

    extraLinksToMain: function() {
        var extramenuLinks = $('#menuextras').find('li');
        var mainmenu = $('#mainmenu');
        var count = 0;
        if ($(extramenuLinks).length > 2) {
            $(extramenuLinks).each(function() {
                if (count < 3) {
                    var newLink = $(this);
                    $(newLink).addClass('dynamic-add');
                    $(mainmenu).append(newLink);
                }
                count++;
            });
        }
    },

    mainLinkstoExtra: function() {
        var mainmenuLinks = $('#mainmenu').find('.dynamic-add');
        var extramenu = $('#menuextras');
        var count = 0;
        $(mainmenuLinks).each(function() {
            var newLink = $(this);
            $(extramenu).prepend(newLink);
            count++;
        });
    }
}
