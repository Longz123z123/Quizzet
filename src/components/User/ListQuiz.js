import { useEffect, useState } from 'react';
import { getAllQuizzes } from '../../services/apiServices';
import ReactPaginate from 'react-paginate'; // Import react-paginate
import './ListQuiz.scss';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
const ListQuiz = (props) => {
  const navigate = useNavigate();

  const [arrQuiz, setArrQuiz] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Trang hiện tại
  const quizzesPerPage = 10; // Số quiz mỗi trang

  useEffect(() => {
    getQuizData();
  }, []);

  const getQuizData = async () => {
    const res = await getAllQuizzes();
    if (res && res.EC === 0) {
      setArrQuiz(res.DT);
    }
  };

  // Tính toán index đầu tiên và cuối cùng của quiz hiển thị trên trang hiện tại
  const indexOfLastQuiz = (currentPage + 1) * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = arrQuiz.slice(indexOfFirstQuiz, indexOfLastQuiz);

  // Hàm xử lý khi thay đổi trang
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected); // Cập nhật trang hiện tại
  };
  console.log('check quiz', arrQuiz);
  return (
    <>
      {/* Container chính của ListQuiz */}
      <div className="list-quiz-container container">
        {currentQuizzes && currentQuizzes.length > 0 ? (
          currentQuizzes.map((quiz, index) => (
            <div key={`${index}-quiz`} className="card" style={{ width: '18rem' }}>
              <img
                src={`data:image/jpeg;base64,${quiz.image}`}
                className="card-img-top"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">Quiz : {quiz.name}</h5>
                <p className="card-text">{quiz.description}</p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate(`/quiz/${quiz.id}`, { state: { quizTitle: quiz.description } })
                  }
                >
                  Start now
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>You don't have any quiz now...</div>
        )}

        {/* Footer for pagination */}
        <div className="pagination-footer">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(arrQuiz.length / quizzesPerPage)} // Tổng số trang
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousClassName={'pagination__link'}
            nextClassName={'pagination__link'}
            breakClassName={'pagination__link'}
            pageClassName={'pagination__link'}
          />
        </div>
      </div>

      {/* Footer nằm ngoài */}
      <Footer />
    </>
  );
};

export default ListQuiz;
