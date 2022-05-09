import "./directory.styles.scss";
import CategoryItem from "../category-item/category-item.component";

const Directory = ({ categories }) => (
  <div className="directory">
    {categories.map((category) => (
      <CategoryItem key={category.id} category={category}></CategoryItem>
    ))}
  </div>
);

export default Directory;
