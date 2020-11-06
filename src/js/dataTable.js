var table = $('#dataFilter').DataTable({
    "ajax": "./data/company.txt",
    "pageLength": 25,
    "lengthMenu": [25, 50, 100],
    orderCellsTop: true,
    fixedHeader: {
        header: true
    },
    columns: [
        { name: 'Company' },
        { name: 'Customer' },
        { name: 'Fiscal year' },
        { name: 'Doc. number' },
        { name: 'Doc. type' },
        { name: 'Doc. status' },
        { name: 'Bank name' },
        { name: 'Doc. period' },
        { name: 'Amount' },
        { name: 'Currency' },
        { name: 'Due in' },
        { name: 'Service' },
        { name: 'Is Paid' },
    ],


    initComplete: function () {

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
                .on('change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );

                    column
                        .search(val ? '^' + val + '$' : '', true, false)
                        .draw();
                });

            column.data().unique().sort().each(function (d, j) {
                select.append('<option value="' + d + '">' + d + '</option>')
            });

            colArray = [];
            $.each(table.columns, function (index, value) {
                colArray.push({
                    name: table.columns[value.name]
                });
            });

            select.before('<input class="datalist-filter" type="text" list="Column' + this.index() + '" placeholder="' + colArray + '" />');
        });

    }

 });