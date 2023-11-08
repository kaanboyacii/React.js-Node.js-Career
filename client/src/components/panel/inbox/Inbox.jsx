import React from "react";
import "./inbox.scss";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import AvatarImage from "../../../img/avatar.jpg";

const inboxData = [
  {
    name: "Emelie John",
    message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, a nulla eaque expedita nobis odio architecto eos omnis animi magni harum commodi, incidunt doloribus atque! ora natus ipsam neque id maiores rerum, mollitia necessitatibus non beatae molestiae nemo accusamus aperiam, suscipit impedit ex porro iusto aliquam ut repellat quos corrupti veritatis earum. At cumque similique nostrum esse repellat?",
  },
  {
    name: "John Doe",
    message: " Lorem ipsum dolor sit amet consectetur adi ut repellat quos corrupti veritatis earum. At cumque similique nostrum esse repellat?",
  },
  {
    name: "John Carrich",
    message: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, a nulla eaque expedita n. Aut dicta tempora natus ipsam neque id maiores rerum, mollitia necessitatibus non beatae molestiae nemo accusamus aperiam, suscipit impedit ex porro iusto aliquam ut repellat quos corrupti veritatis earum. At cumque similique nostrum esse repellat?",
  },
  {
    name: "Xlatan Xea",
    message: " Lorem ipsum do harum perspiciatis neque facere ad quibusdam? Id accusamus ullam amet. Aut dicta tempora natus ipsam neque id maiores rerum, mollitia necessitatibus non beatae molestiae nemo accusamus aperiam, suscipit impedit ex porro iusto aliquam ut repellat quos corrupti veritatis earum. At cumque similique nostrum esse repellat?",
  },
];
const Inbox = () => {
  return (
    <div className="inbox">
      {inboxData.map((data, index) => (
        <div className="inbox-card" key={index}>
          <div className="inbox-item">
            <Stack direction="row" spacing={2} alignItems="center">
              <label htmlFor={`avatar-input-${index}`}>
                <Avatar src={AvatarImage} sx={{ width: 100, height: 100 }} />
              </label>
            </Stack>
            <div className="inbox-details">
              <h2>{data.name}</h2>
              <p>{data.message}</p>
             
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Inbox;
