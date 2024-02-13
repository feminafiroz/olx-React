import { useFormik } from "formik";
import { useState, useContext } from "react";
import { FirebaseContext, AuthContext } from "../../context/context";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [img, setImg] = useState(null);
  const date = new Date();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      images: [],
    },
    onSubmit: async ({ title, price, description, images }) => {
      const uploadPromises = images.map((img) => {
        return new Promise((resolve, reject) => {
          firebase
            .storage()
            .ref(`/image/${img.name}`)
            .put(img)
            .then(({ ref }) => {
              ref.getDownloadURL().then((url) => {
                resolve(url);
              });
            })
            .catch((error) => {
              reject(error);
            });
        });
      });

      try {
        const imageUrls = await Promise.all(uploadPromises);

        firebase
          .firestore()
          .collection("products")
          .add({
            title: title,
            price: price,
            description: description,
            imageUrl: imageUrls,
            userId: user.uid,
            createdAt: date.toDateString(),
          })
          .then(() => {
            navigate("/");
          });
      } catch (e) {
        console.log("errror in upload", e);
      }
    },
  });
  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#eff1f3] ">
      <form
        className="w-[50%] h-[70vh]  flex flex-col justify-center items-center rounded-lg bg-white gap-5"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
      >
        <input
          className="w-[90%] p-3  outline-none rounded-lg border-2 border-[#002f34] ring-2 ring-transparent focus:ring-2 focus:ring-[#001f24] transition duration-300"
          type="text"
          name="title"
          placeholder="Name"
          onChange={formik.handleChange}
        />

        <input
          className="w-[90%] p-3 outline-none rounded-lg border-2 border-[#002f34] ring-2 ring-transparent focus:ring-2 focus:ring-[#001f24] transition duration-300"
          type="number"
          name="price"
          placeholder="Price"
          onChange={formik.handleChange}
        />

        <textarea
          className="w-[90%] p-3 outline-none rounded-lg border-2 border-[#002f34] ring-2 ring-transparent focus:ring-2 focus:ring-[#001f24] transition duration-300"
          type="text"
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
        />
        <input
          type="file"
          className="w-[90%] p-3 outline-none rounded-lg border-2 border-[#002f34] ring-2 ring-transparent focus:ring-2 focus:ring-[#001f24] transition duration-300"
          name="images"
          onChange={(e) => {
            const files = e.target.files;
            let myFiles = Array.from(files);
            formik.setFieldValue("images", myFiles);
            setImg(files[0]);
          }}
          multiple
        />

        <button
          className="bg-[#002f34] w-[90%] p-3 rounded-lg capitalize border-4
            border-transparent hover:border-[#002f34] hover:bg-white
            hover:text-[#002f34] text-white relative "
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
