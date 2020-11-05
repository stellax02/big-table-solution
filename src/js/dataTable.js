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

   
        $('#dataFilter thead').append('<tr class="c-mainTable__filters"></tr>');

            this.api().columns().every(function () {
                var column = this;
                var select = $('<select><option value="">Show all</option></select>')
                    .appendTo(('#dataFilter .c-mainTable__filters'))
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

                $(this).html('<input type="text" />').appendTo.select;
            });

    }

 });