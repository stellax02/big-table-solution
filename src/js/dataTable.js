var table = $('#dataFilter').DataTable({
    "ajax": "./data/company.txt",
    "pageLength": 25,
    "lengthMenu": [25, 50, 100],
 

    initComplete: function () {

        // Fixed Header
        var header = $('thead');
        var hieghtThreshold = header.offset().top;
        $(window).scroll(function () {
            var scroll = $(window).scrollTop();
            if (scroll >= hieghtThreshold) {
                header.addClass('fixed')
            } else {
                header.removeClass('fixed');
            }
        });

        // Main Search Placeholder
        $('.dataTables_filter input').attr('placeholder', 'Search');

        // Create Filters Modal
        $('#dataFilter thead').append('<tr class="c-mainTable__filters"></tr>');
        $('#dataFilter .c-mainTable__filters').append('<div class="datalist-modal"></div>');

        // Create Filters Button
        $('#dataFilter .c-mainTable__filters').after('<div class="c-mainTable__button"><input type="button" href="#home" value="Open filters" class="filters_Toggler" /></div>');


        // Open Filters Modal
        $('.filters_Toggler').click(function () {
            $('.c-mainTable__filters').toggleClass('open');
            var show = $(this).val() === 'Open filters';
            $(this).val(show ? 'Hide filters' : 'Open filters');
        });

        // Create Column Filters
        this.api().columns().every(function () {
            var column = this;
            var select = $('<datalist id="Column' + this.index() +'"></datalist>')
                .appendTo(('#dataFilter .datalist-modal'))
                .on('click', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                        .search(val ? '^' + val + '$' : '', true, false)
                        .draw();
                });

            column.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
                // Checked / Unchecked icons
                $('td').filter(function () {
                    return $(this).text() === "checked";
                }).addClass("checked");
                $('td:contains("unchecked")').addClass("unchecked");
            });

            select.before('<input class="datalist-filter" type="text" list="Column' + this.index() + '" placeholder="Show all" />');
        });

    }

 });