$('#dataFilter').DataTable({
    "ajax": "./data/company.txt",
    responsive: true,
    "pageLength": 25,
    "lengthMenu": [25, 50, 100],
    fixedHeader: {
        header: true
    },
    initComplete: function () {
        this.api().columns().every(function () {
            var column = this;

            var select = $('<select id="formfilter" class="filterdropdown"><option value="">' + $(column.header()).text() + '</option></select>')
                .appendTo($(column.header()).empty())
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
        });
    }
 });