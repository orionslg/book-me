# book-me

## Routing


1. GET, /book, menampilkan form untuk booking dan tabel hotel
2. POST, /book, menambah booking di sebuah hotel, redirect ke /book
3. GET, /checkout, menampilkan form rating dan mengubah status checkout
4. POST, /checkout, menambah rating dan redirect ke index (home page)
5. GET, /book/:guestId/edit, mengedit dengan default value form dari yang sekarang
6. POST, /book/:guestId/edit, mengupdate dan redirect ke /book
7. GET, /book/:guestId/delete, menghapus data guest
8. GET, /book?sortBy=, mensort table berdasarkan value sortBy