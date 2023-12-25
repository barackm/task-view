"use client";
import CoverPictureControls from "@/components/projects/coverPictureControls";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LuCalendarDays } from "react-icons/lu";
import { LuActivitySquare } from "react-icons/lu";
import React from "react";
import { LuUser } from "react-icons/lu";
import { IconContext } from "react-icons";
import { Input } from "@/components/ui/input";
import ProjectsTable from "@/components/projects/projectsTable";

const EditProject = () => {
  const asideItems = [
    {
      label: "Owner",
      icon: <LuUser />,
      value: (
        <>
          <Avatar className="mr-2 w-8 h-8 rounded-full">
            <AvatarImage
              src={`https://avatar.vercel.sh/1.png`}
              alt="Project name"
              className="grayscale"
            />
          </Avatar>
          <span className="text-xs font-medium">Barack Mukelenga</span>
        </>
      ),
    },
    {
      label: "Dates",
      icon: <LuCalendarDays />,
      value: "12/12/2021 - 12/12/2021",
    },
    {
      label: "Progress",
      icon: <LuActivitySquare />,
      value: "40%",
    },
  ];

  return (
    <div className="relative">
      <div className="relative">
        <div className="bg-blue-500 h-60 w-full flex justify-end p-4">
          <div className="">
            <CoverPictureControls />
          </div>
        </div>
        <div className="rounded-sm bg-white w-28 h-28 absolute -bottom-12 left-10 overflow-hidden">
          <Avatar className="mr-2 w-28 h-28 rounded-none">
            <AvatarImage
              src={`https://avatar.vercel.sh/1.png`}
              alt="Project name"
              className="grayscale"
            />
          </Avatar>
        </div>
      </div>
      <div className="flex px-10 pt-20 gap-10">
        <div className="w-4/6">
          <div className="">
            <Input
              className="text-4xl tracking-tighter py-2 px-0 border-none shadow-none font-semibold"
              value="😎This is the project name"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium mb-2 mt-4">Description</h3>
          </div>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            eveniet illo perspiciatis ipsa hic. Omnis neque iure inventore, eum
            tempora nobis rerum minima voluptate aspernatur ullam obcaecati
            dicta suscipit officiis quo,
            <br />
            <br /> quam fuga accusamus nostrum doloremque ab distinctio
            eligendi? Vero cumque corporis quos itaque ab. Iure dolore
            praesentium maxime pariatur rem? Pariatur exercitationem quo laborum
            provident est iusto, vitae quaerat numquam itaque porro praesentium
            doloremque asperiores expedita, a assumenda architecto explicabo,{" "}
            <br />
            <br />
            eos sapiente minus culpa veritatis corporis quisquam. Nam, quasi,
            minus accusamus nostrum, in corrupti adipisci aliquid assumenda
            molestiae harum consequuntur quisquam et ducimus. Consequuntur ipsa
            earum eligendi sapiente veritatis quas quibusdam, molestiae quae
            eaque provident pariatur sunt omnis eveniet iste nostrum modi eum
            quos error, corrupti cupiditate? Consectetur, incidunt qui. <br />
            <br />
            Alias facere autem hic, porro nam obcaecati non in maxime sequi illo
            at. Eaque ratione minima provident saepe? Incidunt, quibusdam
            consectetur deserunt cupiditate vel nobis distinctio error alias
            aspernatur adipisci nihil nisi numquam, aut soluta tenetur optio
            aperiam laudantium. Aperiam doloribus voluptatibus similique
            repellat? Cupiditate nesciunt tempora, placeat facere eos vero,{" "}
            <br />
            <br />
            nemo voluptas quis a perspiciatis itaque ea, maiores eveniet
            accusantium accusamus. Consectetur quas veniam ex dolore eaque
            praesentium blanditiis, inventore tempora dolores odio facere id qui
            labore doloremque repellat quidem, autem, vitae porro provident
            ducimus ea tenetur eveniet itaque unde! Repellendus deleniti
            reprehenderit similique est qui odit impedit cumque laboriosam
            numquam veniam natus voluptas iste illum distinctio dolor quas,
            <br /> <br /> omnis eos quia aliquid quidem. Harum nemo deserunt,
            cumque blanditiis ex dolorem laudantium sint, nostrum adipisci
            explicabo molestiae dicta earum provident quos tenetur iure quod
            nihil libero reiciendis nesciunt dolore qui porro accusantium!
            Veritatis consectetur aut voluptates perspiciatis <br />
            <br />
            cumque eligendi explicabo officiis non sapiente dignissimos
            repellendus, voluptatibus earum ab harum nostrum, reiciendis
            maiores, animi et quis? Sunt minima obcaecati dolores asperiores
            cum, explicabo soluta dolorum ab quas ipsa hic.
          </div>
        </div>
        <aside className="w-2/6 sticky top-16">
          <ul className="flex flex-col gap-2">
            {asideItems.map((item) => (
              <li className="flex items-center gap-2" key={item.label}>
                <div className="flex w-2/5 gap-2 items-center text-gray-600 px-2 py-1 hover:bg-gray-300 rounded-sm cursor-pointer">
                  <IconContext.Provider value={{ className: "text-xl" }}>
                    {item.icon}
                  </IconContext.Provider>
                  <span className="text-xs font-medium">{item.label}</span>
                </div>
                <div className="flex items-center w-3/5 text-xs font-medium">
                  {item.value}
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
      <div className="px-10 mt-10 mb-10">
        <h3>
          Tasks <span className="text-xs text-gray-500">(12)</span>
        </h3>
        <ProjectsTable />
      </div>
    </div>
  );
};

export default EditProject;
