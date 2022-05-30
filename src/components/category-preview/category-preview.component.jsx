import { useNavigate } from "react-router-dom";
import ProductCard from "../product-card/product-card.component";
import "./category-preview.styles.scss";

const CategoryPreview = ({ title, products }) => {
  const navigate = useNavigate();
  const navigateToCategory = () => {
    navigate(`/shop/${title}`);
  };
  return (
    <div className="category-preview-container">
      <h2>
        <span className="title" onClick={navigateToCategory}>
          {title.toUpperCase()}
        </span>
      </h2>
      <div className="preview">
        {products
          .filter((_, idx) => idx < 4)
          .map((product) => {
            return <ProductCard key={product.name} product={product} />;
          })}
      </div>
    </div>
  );
};

export default CategoryPreview;
