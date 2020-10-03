const renderMovieDetails = (event) => {
    console.log(event.target.id);
    // document.querySelectorAll('.movie-details').forEach(
    //     item => item.classList.add('d-none')
    // );
    event.target.nextElementSibling.classList.toggle('d-none');
}

export default renderMovieDetails;