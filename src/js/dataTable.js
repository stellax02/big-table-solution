$('#dataFilter').DataTable({
    "ajax": "./data/company.txt",
    responsive: true,
    "pageLength": 25,
    "lengthMenu": [25, 50, 100],
    orderCellsTop: true,
    fixedHeader: {
        header: true
    },
    initComplete: function () {

        $('.dataTables_filter input').attr('placeholder', 'Search');

        $('#dataFilter thead').append('<tr class="c-mainTable__filters"></tr>');
        $('#dataFilter .c-mainTable__filters').append('<div class="c-mainTable__button"><input type="button" value="Open filters" class="filters_Toggler" data-class="open" data-target=".c-mainTable__modal" /></div>');
        $('#dataFilter .c-mainTable__filters').append('<div class="c-mainTable__modal"></div>');
        

            this.api().columns().every(function () {
                var column = this;
                var select = $('<datalist id="Column' + this.index() +'"></datalist>')
                    .appendTo(('#dataFilter .c-mainTable__modal'))
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

                select.before('<input class="datalist-filter" type="text" list="Column' + this.index() +'" placeholder="Show all" />');
            });

    }

 });