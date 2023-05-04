import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer>
      <div className="bg-[#0F1A2C] relative z-[10000] mx-auto">
        <div className="container mx-auto">
          <div className="bg-[#0F1A2C] py-8 flex flex-col justify-center">
            <div className="flex flex-col ultra-sm:flex-row justify-center ultra-sm:justify-start gap-2 ultra-sm:gap-4 mx-8 mb-4">
              <img
                src="https://cohort-test.mywire.org/static/logo.png"
                className="w-24 object-fit-cover"
              />
              <div className="flex items-center">
                <h1 className="text-[#FFCC34] text-2xl font-bold">
                  Есть идеи как улучшить?
                </h1>
              </div>
            </div>
            <p className="text-[#CBDEEC] mx-8 mb-4">
              Если вы еще не в закрытой группе владельцев каналов, тo{" "}
              <span className="font-bold underline">
                <a href="{{JOIN_LINK}}">вступите</a>
              </span>{" "}
              и поделитесь мыслями в чате по улучшению сервиса.
            </p>
            <p className="text-[#CBDEEC] mx-8 mb-4">
              Напишите основателю Диме личное сообщение{" "}
              <span className="font-bold underline">
                <a href="{{FOUNDER_LINK}}">в телеграме</a>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#FFCC34] relative z-[10000] mx-auto">
        <div className="container mx-auto">
          <div className="bg-[#FFCC34] p-8">
            <h2 className="text-xl text-[#0F1A2C] font-bold  mb-4">
              Хотите первыми протестировать анализ пригласительных ссылок?
            </h2>
            <p className="text-left text-[#0F1A2C] max-w-2xl mb-4">
              Почти как анализ оттока по времени, только с определением цены
              подписчика и расширенной информацией о ссылке.
            </p>
            <p className="text-left text-[#0F1A2C] max-w-2xl mb-4">
              Напишите основателю Диме личное сообщение в{" "}
              <span className="font-bold underline">
                <a href="{{FOUNDER_LINK}}">в телеграме</a>
              </span>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
