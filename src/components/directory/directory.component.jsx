import "./directory.styles.scss";
import DirectoryItem from "../directory-item/directory-item.component";

const Directory = ({ categories }) => (
  <div className="directory">
    {categories.map((category) => (
      <DirectoryItem key={category.id} category={category}></DirectoryItem>
    ))}
  </div>
);

export default Directory;
