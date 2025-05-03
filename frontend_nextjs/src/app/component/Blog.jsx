import React from "react";

export default function BlogSection () {
  return (
    <>
     <div className=" bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
   
        <section className=" pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-[120px] flex justify-center text-gray-800 " id="blog">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4">
                <div className="mx-auto mb-[60px] max-w-[510px] text-center lg:mb-20">
                </div>
              </div>
            </div>

            <div className="-mx-4 flex flex-wrap justify-center">
              <BlogCard
                CardTitle="Meet AutoManage, the best AI management tools"
                CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                image="/girl.png"
              />
              <BlogCard
                CardTitle="Meet AutoManage, the best AI management tools"
                CardDescription="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                image="/guy.png"
              />
            </div>
          </div>
        </section>
        </div>
      
    </>
  );
};



const BlogCard = ({ image, date, CardTitle, CardDescription }) => {
  return (
    <>
      <div className="w-full px-4 md:w-1/2 lg:w-1/3 flex flex-col items-center mr-14">
        <div className="mb-10 w-full flex flex-col items-center">
          <div className="mb-6  rounded w-full h-[600px] flex justify-center items-center">
            <img src={image} alt="" className="max-h-full max-w-full object-contain" />
          </div>
          <div className="text-center">
            {date && (
              <span className="mb-5 inline-block rounded bg-primary px-4 py-1 text-center text-xs font-semibold leading-loose">
                {date}
              </span>
            )}
            <h3>
              <a
                href="/#"
                className="mb-4 inline-block text-xl font-semibold text-dark hover:text-primary sm:text-2xl lg:text-xl xl:text-2xl"
              >
                {CardTitle}
              </a>
            </h3>
            <p className="text-base text-body-color dark:text-dark-6">
              {CardDescription}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
