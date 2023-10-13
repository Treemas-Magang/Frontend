import FormPages from "../../../components/Content/FormPages/FormPages";
import "./announcementform.css";

const MasterDataAnnouncementForm = () => {
  return <div className="announcementform__container">
      <div className="content__container">
            <FormPages formTitle="Announcement Form" title="Title" header="Header" body="Body" footer="Footer" image="Gambar" showUpload={true} />
        </div>
    </div>
};

export default MasterDataAnnouncementForm;
