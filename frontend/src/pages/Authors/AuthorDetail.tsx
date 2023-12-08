import axios from "axios";
import Headerbar from "../../components/Header";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_DB_URL;

const AuthorDetail = () => {
  const [authorDetail, setAuthorDetail] = React.useState<any>({});
  
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();

  const token = localStorage.getItem("token");

  const fetchAuthorDetail = async () => {
    if (!params.id) {
      return;
    }

    try {
      const response = await axios.get(`${url}/authors/` + params.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAuthorDetail(response.data.data);
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message;
      return errorMessage;
    }
  };
  async function deleteAuthor (){
    
    try {

      await axios.delete(`${url}/authors/${authorDetail.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
       Swal.fire({
         title: "Success!",
         text: "You have successfully deleted the author!",
         background: "#242424",
         icon: "success",
         timer: 10000,
       });
      navigate("/authors");
    } catch (error:any) {

      Swal.fire({
        title: "Error!",
        text: "You can't delete this author because he has books!",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    
  }

  React.useEffect(() => {
    fetchAuthorDetail();
  });

  return (
    <>
      <Headerbar />
      <Container className="fs-5 mt-5">
        <ul
          style={{
            listStyleType: "none",
          }}
          key={authorDetail.id}>
          <h1>
            {authorDetail.first_name} {authorDetail.family_name}
          </h1>
          <li className="ms-2">
            <strong>Date of Birth</strong> : {authorDetail.date_of_birth}
          </li>
          <li className="ms-2">
            <strong>Date of Death</strong> : {authorDetail.date_of_death}
          </li>
        </ul>
        <Button variant="danger" onClick={()=>{deleteAuthor()}}>
          Delete
        </Button>
      </Container>
    </>
  );
};

export default AuthorDetail;
