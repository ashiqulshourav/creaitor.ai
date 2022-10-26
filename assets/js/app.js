jQuery(document).ready(function() {
    // Hide all main content section 
    jQuery('.main-content-body .tab-content:not(:first-child)').hide();


    // main content activation 
    let item = jQuery('.main-content-header ul li');
    item.click(function() {

        // add active class for individual item
        if (!jQuery(this).hasClass('active')) {
            item.removeClass("active");
            jQuery(this).addClass("active");
        }

        // active individual section 
        let sectionId = jQuery(this).find("a").attr('data-content');
        jQuery('.main-content-body .tab-content').hide()
        jQuery(`.main-content-body .tab-content.${sectionId}`).show()
    })

    // ranger value update 
    jQuery('#outputs').change(function() {
        jQuery('.range-value').text(jQuery(this).val())
    })

    // toggle settings
    jQuery('.accordion-button').click(function(e) {
        e.preventDefault();
        jQuery(this).toggleClass("collapsed"); // toggle class collapsed for change arrow icon
        jQuery(this).parents(".form-bottom").find('.accordion-body').slideToggle();

        if (matchMedia('only screen and (min-width: 992px)').matches) {
            jQuery('.ai-assistant-page .form-top').toggleClass("heightAd");
        }
    })

    // toggle ai-assistant dropdown
    let multiselect = jQuery('.multiselect #multiselectSearch');
    let multiselectItem = jQuery('.multiselect .select-dropdown li');
    multiselect.click(function() {
        jQuery(this).parents('.multiselect').toggleClass('active');
    })

    multiselectItem.click(function() {
        let imgSrc = jQuery(this).find('img').attr('src');
        let itemText = jQuery(this).find('.item-text').text();
        jQuery(this).parents('.multiselect').find('.selected-item img').attr('src', imgSrc)
        jQuery(this).parents('.multiselect').find('.selected-item .item-text').text(itemText);
        jQuery(this).parent().find('li').removeClass('active');
        jQuery(this).addClass('active');
        removeAiDropdown()
    })

    // remove dropdown
    function removeAiDropdown() {
        jQuery('.multiselect').removeClass('active');
    }

    function creativityDropdownRemove() {
        jQuery('.creativity .select-dropdown').removeClass('active');
    }

    // update settings creativity dropdown from value
    let creativityInput = jQuery('.creativity input');
    let creativityDropdown = jQuery('.creativity .select-dropdown');
    let creativityDropdownItem = jQuery('.creativity .select-dropdown li');

    creativityInput.click(function() {
        creativityDropdown.toggleClass('active');
    })

    creativityDropdownItem.click(function() {
        let value = jQuery(this).text();
        creativityInput.val(value)
        creativityDropdown.removeClass('active');
    })

    // Toggle mobile menu
    jQuery('.mobile-menu').click(function() {
        jQuery('.menubar').toggleClass('active');
    })


    // remove dropdown clicking outside of dropdown
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.multiselect')) {
            removeAiDropdown()
        }

        if (!e.target.closest('.creativity')) {
            creativityDropdownRemove()
        }

        if (jQuery('.menubar').hasClass('active')) {
            if (!e.target.closest('.mobile-menu') && !e.target.closest('.menubar')) {
                jQuery('.menubar').css("width", 0);
                jQuery('.menubar').on('transitionend webkitTransitionEnd oTransitionEnd', function() {
                    jQuery('.menubar').removeClass('active');
                    jQuery('.menubar').removeAttr('style');
                })
            }
        }
    })
})

//make category object

const categories = [{
            category: "headline",
            name: "Headline",
            imgSrc: "blog-icon.svg",
            fields: [{
                title: "Description",
                placeholder: "Headline",
                id: 'headline',
            }, {
                title: "Product / Service",
                placeholder: "Headline",
                id: 'productService',
            }]
        },
        {
            category: "blog-intro",
            name: "Blog Intro",
            imgSrc: "ecomerce-icon.svg",
            fields: [{
                title: "Write about your blog topic",
                placeholder: "e.g How AI will improve the future of content writing",
                id: "blog",
            }, {
                title: "Product / Service",
                placeholder: "",
                id: "productService"
            }, {
                title: "Keywords",
                placeholder: "e.g. ai, ai tool, content writing, future",
                id: "keywords",
            }]
        },
    ]
    // declare multiSelect Dropdown 
let multiselectDropdown = document.querySelector('.multiselect .select-dropdown');


categories.forEach((item, index) => {
    // creating tag for all items
    let li = document.createElement('li');
    let iTag = document.createElement('i');
    let img = document.createElement('img');
    let span = document.createElement('span')

    // added class name for li & inner child
    li.classList.add("flex-nowrap", "align-center");
    li.setAttribute('data-category', item.category)
    iTag.classList.add('icon');
    img.setAttribute('src', `assets/img/${item.imgSrc}`);
    span.classList.add('item-text');
    span.innerText = item.name;

    // push element to parent 
    li.appendChild(iTag)
    iTag.appendChild(img)
    li.appendChild(span)

    multiselectDropdown.appendChild(li);
})


// on click field change
const dropdownItems = document.querySelectorAll('.multiselect .select-dropdown li');
dropdownItems.forEach((item) => {
    item.addEventListener('click', function() {
        const formFieldWrapper = document.querySelector('.form-top-inner');
        //remove child element not first child
        jQuery('.form-top-inner .input-block:not(:first-child)').remove();

        // get data-category attribute value
        const category = item.getAttribute('data-category');

        categories.forEach((i, n) => {
            if (category == i.category) {
                // get all fields
                let fields = i.fields;
                fields.forEach((a, b) => {
                    // create element for individual fields
                    let div = document.createElement('div');
                    let label = document.createElement('label');

                    div.appendChild(label);
                    // if first fields item title is description then create textarea
                    if (b === 0) {
                        const attribute = {
                            name: a.title,
                            id: a.id,
                            rows: 2,
                            placeholder: a.placeholder,
                        };
                        let textarea = document.createElement('textarea');
                        setAttributes(textarea, attribute);

                        div.appendChild(textarea);
                    } else {
                        const attribute = {
                            type: "text",
                            id: a.id,
                            placeholder: a.placeholder
                        };
                        let input = document.createElement('input');
                        setAttributes(input, attribute)
                        div.appendChild(input)
                    }

                    // set class name or attribute for node
                    div.classList.add("input-block", a.id);
                    label.setAttribute('for', a.id);


                    label.innerText = a.title;


                    formFieldWrapper.appendChild(div)
                })

            }
        })
    })
});


// set multiple attribute of element 
function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(attr => {
        element.setAttribute(attr, attributes[attr])
    })
}


// Form submit 
const form = document.querySelector('#aiAssistantForm');

form.addEventListener('submit', function(e) {
    // prevent Default
    e.preventDefault();

    // get all input element 
    let inputElements = form.querySelectorAll('input');
    let inputTextarea = form.querySelectorAll('textarea');

    console.log(inputElements)
    console.log(inputTextarea)
})