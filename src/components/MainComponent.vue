<script setup lang="ts">
import contentJson from "../assets/content.json";
import { ref } from "vue";
import Popper from "vue3-popper";
import Markdown from "vue3-markdown-it";
import { Content, Section } from "../types/content";

const shuffle = (array: string[]) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const photos = shuffle([
  "graduation.jpg",
  "decode.jpg",
  "hackai.jpg",
  "quic.png",
  "google.jpg",
  "lake.jpg",
]);

const getImage = (path: string) => {
  return new URL(`/src/assets/${path}`, import.meta.url).href;
};

const content: Content = contentJson;

const today = new Date();

const getToday = () => {
  return `${today.toLocaleString("en-US", {
    month: "long",
  })} ${today.getFullYear()}`;
};

const sections = [
  { name: "Hackathons", section: content.experiences.firstSection },
  { name: "Experiences", section: content.experiences.secondSection },
  { name: "Projects", section: content.experiences.thirdSection },
];

const selectedSection = ref(1);
const animationOpacity = ref(true);
const itemViewAnimation = ref(true);
const imgOpacity = ref([0, 0, 0, 0, 0, 0]);
const selectedItem = ref<Section>();
const mainContent = ref<HTMLInputElement>();
const isMainContentOnTop = ref(false);

const getSectionData = () => {
  const sectionData: Section[] = sections[selectedSection.value].section;
  return sectionData.filter((experience: Section) => {
    return experience.show;
  });
};

const selectedSectionData = ref(getSectionData());

const updateSelectedSection = (index: number) => {
  animationOpacity.value = false;
  setTimeout(() => {
    animationOpacity.value = true;
  });

  selectedSection.value = index;
  selectedSectionData.value = getSectionData();
};

const selectItem = (id: string) => {
  itemViewAnimation.value = false;
  setTimeout(() => {
    itemViewAnimation.value = true;
  });
  const sectionData: Section[] = sections[selectedSection.value].section;
  selectedItem.value = sectionData.filter((experience: Section) => {
    return experience.id === id;
  })[0];
};

const closeItemView = () => {
  itemViewAnimation.value = false;
  setTimeout(() => {
    selectedItem.value = undefined;
  }, 300);
};

const changeImgOpacity = () => {
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      imgOpacity.value[i] = 100;
    }, i * 450);
  }
};
changeImgOpacity();

const trackMainContentLocation = () => {
  const mainContentValue = mainContent.value;
  if (mainContentValue) {
    let loc = mainContentValue.getBoundingClientRect().top;
    if (loc === 0) {
      isMainContentOnTop.value = true;
    } else if (loc > 0) {
      isMainContentOnTop.value = false;
    }
  }
};
</script>

<template>
  <div
    class="
      absolute
      h-screen
      w-screen
      overflow-y-scroll
      snap snap-y snap-mandatory
    "
    @scroll="trackMainContentLocation"
  >
    <div class="h-screen w-screen fixed z-0">
      <div class="relative bg-white overflow-hidden h-screen">
        <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
          <div
            class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static"
          >
            <div class="sm:max-w-lg">
              <h1
                class="
                  text-4xl
                  font font-extrabold
                  tracking-tight
                  text-gray-900
                  sm:text-6xl
                "
              >
                Hey! 👋🏽
              </h1>
              <!-- eslint-disable vue/no-v-html -->
              <p class="my-10 text-xl text-left" v-html="content.bio"></p>
              <!--eslint-enable-->
            </div>
            <div>
              <div class="mt-10">
                <div
                  aria-hidden="true"
                  class="
                    pointer-events-none
                    lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full
                  "
                >
                  <div
                    class="
                      absolute
                      transform
                      sm:left-1/2 sm:top-0 sm:translate-x-8
                      lg:left-1/2
                      lg:top-1/2
                      lg:-translate-y-1/2
                      lg:translate-x-8
                    "
                  >
                    <div class="flex items-center space-x-6 lg:space-x-8 mb-16">
                      <div
                        class="
                          flex-shrink-0
                          grid grid-cols-1
                          gap-y-6
                          lg:gap-y-8
                        "
                      >
                        <div
                          class="
                            w-44
                            h-64
                            rounded-lg
                            overflow-hidden
                            sm:opacity-0
                            lg:opacity-100
                          "
                        >
                          <img
                            :src="getImage(`memory/${photos[0]}`)"
                            alt=""
                            :class="`opacity-${imgOpacity[1]}`"
                            class="
                              transition-opacity
                              ease-in
                              duration-500
                              w-full
                              h-full
                              object-center object-cover
                            "
                          />
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            :src="getImage(`memory/${photos[1]}`)"
                            alt=""
                            :class="`opacity-${imgOpacity[2]}`"
                            class="
                              transition-opacity
                              ease-in
                              duration-500
                              w-full
                              h-full
                              object-center object-cover
                            "
                          />
                        </div>
                      </div>
                      <div
                        class="
                          flex-shrink-0
                          grid grid-cols-1
                          gap-y-6
                          lg:gap-y-8
                        "
                      >
                        <div class="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            :src="getImage(`memory/${photos[2]}`)"
                            alt=""
                            :class="`opacity-${imgOpacity[0]}`"
                            class="
                              transition-opacity
                              ease-in
                              duration-500
                              w-full
                              h-full
                              object-center object-cover
                            "
                          />
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            src="../assets/memory/me2.jpg"
                            alt="emoji"
                            class="w-full h-full object-center object-cover"
                          />
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            :src="getImage(`memory/${photos[3]}`)"
                            alt=""
                            :class="`opacity-${imgOpacity[3]}`"
                            class="
                              transition-opacity
                              ease-in
                              duration-500
                              w-full
                              h-full
                              object-center object-cover
                            "
                          />
                        </div>
                      </div>
                      <div
                        class="
                          flex-shrink-0
                          grid grid-cols-1
                          gap-y-6
                          lg:gap-y-8
                        "
                      >
                        <div class="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            :src="getImage(`memory/${photos[4]}`)"
                            alt=""
                            :class="`opacity-${imgOpacity[5]}`"
                            class="
                              transition-opacity
                              ease-in
                              duration-500
                              w-full
                              h-full
                              object-center object-cover
                            "
                          />
                        </div>
                        <div class="w-44 h-64 rounded-lg overflow-hidden">
                          <img
                            :src="getImage(`memory/${photos[5]}`)"
                            alt=""
                            :class="`opacity-${imgOpacity[4]}`"
                            class="
                              transition-opacity
                              ease-in
                              duration-500
                              w-full
                              h-full
                              object-center object-cover
                            "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-screen relative z-10 snap-start"></div>
    <div
      ref="mainContent"
      class="relative z-10 snap-start overflow-hidden min-h-screen bg-white"
    >
      <div
        v-if="selectedItem"
        class="
          fixed
          top-0
          w-screen
          min-h-screen
          bg-white
          transform
          duration-300
          transition-all
          ease-in
          z-50
        "
        :class="itemViewAnimation ? 'translate-y-0' : 'translate-y-full'"
      >
        <div
          class="
            flex flex-row
            justify-center
            fixed
            z-50
            w-screen
            bg-gray-50
            hover:bg-gray-100
            cursor-pointer
          "
          @click="closeItemView"
        >
          <button type="button" class="text-gray-500 m-2">
            <span class="sr-only">Close</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
        <div class="h-screen overflow-y-auto">
          <div
            class="
              mt-24
              mb-8
              px-10
              w-full
              grid grid-cols-1
              gap-y-8 gap-x-6
              items-start
              sm:grid-cols-12
              lg:gap-x-8
            "
          >
            <div
              class="
                aspect-w-3 aspect-h-2
                rounded-lg
                overflow-hidden
                sm:col-span-4
                lg:col-span-5
                mt-1
              "
            >
              <iframe
                v-if="selectedItem.memory.video"
                :src="`https://www.youtube.com/embed/${selectedItem.memory.video}`"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
              <img
                v-else
                :src="getImage(`memory/${selectedItem.memory.image?.name}`)"
                class="object-center object-cover"
              />
            </div>
            <div class="sm:col-span-8 lg:col-span-7">
              <h2 class="text-2xl font-extrabold text-gray-900 sm:pr-12">
                {{ selectedItem.title }}
              </h2>

              <div class="text-sm text-gray-500 mb-6">
                <div class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <div>
                    <p class="pt-0.5">
                      {{ selectedItem.date.from }}
                      <span v-if="selectedItem.date.to">
                        -
                        {{
                          selectedItem.date.to === "Now"
                            ? getToday()
                            : selectedItem.date.to
                        }}</span
                      >
                    </p>
                  </div>
                </div>
              </div>
              <div
                v-for="(description, index) in selectedItem.descriptions"
                :key="index"
              >
                <Markdown html breaks :source="description"></Markdown>
              </div>
              <div v-if="selectedItem.memory.links">
                <div
                  v-for="(link, index) in selectedItem.memory.links"
                  :key="index"
                  class="mt-6"
                >
                  <a
                    target="_blank"
                    :href="link.url"
                    class="
                      border border-transparent
                      font-medium
                      text-blue-600
                      hover:text-blue-700
                    "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 inline-block mb-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    {{ link.title }}
                  </a>
                </div>
              </div>

              <p class="mt-6 font-medium">Technologies used:</p>
              <div class="flex flex-wrap overflow-hidden p-1 pb-24">
                <div v-for="tech in selectedItem.technologies" :key="tech">
                  <Popper
                    arrow
                    :content="content.technologies[tech].title"
                    placement="top"
                    offset-distance="1"
                    arrow-padding="0"
                  >
                    <img
                      class="
                        inline-block
                        h-8
                        w-8
                        mt-2
                        mx-1
                        rounded-full
                        ring-1 ring-gray-200
                      "
                      :src="
                        getImage(`tech/${content.technologies[tech].imageName}`)
                      "
                      :alt="content.technologies[tech].title"
                    />
                  </Popper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <nav class="flex flex-row items-center justify-center space-x-4 mt-16">
          <div v-for="(section, index) in sections" :key="section.name">
            <button
              class="py-2 px-2 block hover:text-blue-500 font-medium"
              :class="
                selectedSection == index
                  ? 'text-blue-500 border-b-2 border-blue-500 transform ease-in duration-500'
                  : 'text-gray-600 border-b-2 border-transparent transform ease-out duration-200'
              "
              @click="updateSelectedSection(index)"
            >
              {{ section.name }}
            </button>
          </div>
        </nav>
        <div class="flex flex-col justify-between">
          <div class="pb-16">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div
                class="max-w-2xl mx-auto pt-6 sm:pt-12 lg:pt-16 lg:max-w-none"
              >
                <div
                  class="
                    mt-6
                    space-y-12
                    lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-6
                  "
                >
                  <div
                    v-for="data in selectedSectionData"
                    :key="data.id"
                    class="
                      group
                      relative
                      transform
                      duration-500
                      transition-all
                      ease-in
                    "
                    :class="animationOpacity ? ' opacity-100' : 'opacity-0'"
                  >
                    <div class="cursor-pointer" @click="selectItem(data.id)">
                      <div
                        class="
                          relative
                          w-full
                          h-80
                          bg-white
                          rounded-lg
                          overflow-hidden
                          sm:aspect-w-2 sm:aspect-h-1 sm:h-64
                          lg:aspect-w-1 lg:aspect-h-1
                          transition-shadow
                          ease-in-out
                          duration-200
                          shadow-cs1
                          hover:shadow-cs2
                        "
                      >
                        <img
                          :src="getImage(`logos/${data.logo}.png`)"
                          class="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div class="pt-6 text-sm text-gray-500">
                        <div class="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <div>
                            <p class="pt-0.5">
                              {{ data.date.from }}
                              <span v-if="data.date.to">
                                -
                                {{
                                  data.date.to === "Now"
                                    ? getToday()
                                    : data.date.to
                                }}</span
                              >
                            </p>
                          </div>
                        </div>
                      </div>
                      <p class="pt-2 text-lg font-semibold">
                        {{ data.title }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="fixed bottom-0 w-screen">
          <div
            class="
              bg-white
              h-14
              flex
              items-center
              justify-center
              bg-opacity-80
              backdrop-filter backdrop-blur-sm
            "
          >
            <p class="text-gray-600">
              I would
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 inline-block text-red-600 mb-1.5 mr-0.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clip-rule="evenodd"
                />
              </svg>
              to connect with you!
              <a
                href="https://ca.linkedin.com/in/soheil-hamidi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  class="
                    h-5
                    w-5
                    inline-block
                    mb-1.5
                    mr-0.5
                    ml-1.5
                    text-gray-400
                    hover:text-gray-700
                  "
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="7.025 7.025 497.951 497.95"
                >
                  <path
                    d="M256 7.025C118.494 7.025 7.025 118.494 7.025 256S118.494 504.975 256 504.975 504.976 393.506 504.976 256C504.975 118.494 393.504 7.025 256 7.025zm-66.427 369.343h-54.665V199.761h54.665v176.607zM161.98 176.633c-17.853 0-32.326-14.591-32.326-32.587 0-17.998 14.475-32.588 32.326-32.588s32.324 14.59 32.324 32.588c.001 17.997-14.472 32.587-32.324 32.587zm232.45 199.735h-54.4v-92.704c0-25.426-9.658-39.619-29.763-39.619-21.881 0-33.312 14.782-33.312 39.619v92.704h-52.43V199.761h52.43v23.786s15.771-29.173 53.219-29.173c37.449 0 64.257 22.866 64.257 70.169l-.001 111.825z"
                    fill="currentColor"
                  />
                </svg>
              </a>
              <a
                href="https://github.com/soheil-hamidi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="
                    h-5
                    w-5
                    inline-block
                    text-gray-400
                    hover:text-gray-700
                    mb-1.5
                    mr-0.5
                    ml-1.5
                  "
                  viewBox="0 0 256 249"
                  fill="currentColor"
                >
                  <path
                    d="M127.505 0C57.095 0 0 57.085 0 127.505c0 56.336 36.534 104.13 87.196 120.99 6.372 1.18 8.712-2.766 8.712-6.134 0-3.04-.119-13.085-.173-23.739-35.473 7.713-42.958-15.044-42.958-15.044-5.8-14.738-14.157-18.656-14.157-18.656-11.568-7.914.872-7.752.872-7.752 12.804.9 19.546 13.14 19.546 13.14 11.372 19.493 29.828 13.857 37.104 10.6 1.144-8.242 4.449-13.866 8.095-17.05-28.32-3.225-58.092-14.158-58.092-63.014 0-13.92 4.981-25.295 13.138-34.224-1.324-3.212-5.688-16.18 1.235-33.743 0 0 10.707-3.427 35.073 13.07 10.17-2.826 21.078-4.242 31.914-4.29 10.836.048 21.752 1.464 31.942 4.29 24.337-16.497 35.029-13.07 35.029-13.07 6.94 17.563 2.574 30.531 1.25 33.743 8.175 8.929 13.122 20.303 13.122 34.224 0 48.972-29.828 59.756-58.22 62.912 4.573 3.957 8.648 11.717 8.648 23.612 0 17.06-.148 30.791-.148 34.991 0 3.393 2.295 7.369 8.759 6.117 50.634-16.879 87.122-64.656 87.122-120.973C255.009 57.085 197.922 0 127.505 0"
                  />
                  <path
                    d="M47.755 181.634c-.28.633-1.278.823-2.185.389-.925-.416-1.445-1.28-1.145-1.916.275-.652 1.273-.834 2.196-.396.927.415 1.455 1.287 1.134 1.923M54.027 187.23c-.608.564-1.797.302-2.604-.589-.834-.889-.99-2.077-.373-2.65.627-.563 1.78-.3 2.616.59.834.899.996 2.08.36 2.65M58.33 194.39c-.782.543-2.06.034-2.849-1.1-.781-1.133-.781-2.493.017-3.038.792-.545 2.05-.055 2.85 1.07.78 1.153.78 2.513-.019 3.069M65.606 202.683c-.699.77-2.187.564-3.277-.488-1.114-1.028-1.425-2.487-.724-3.258.707-.772 2.204-.555 3.302.488 1.107 1.026 1.445 2.496.7 3.258M75.01 205.483c-.307.998-1.741 1.452-3.185 1.028-1.442-.437-2.386-1.607-2.095-2.616.3-1.005 1.74-1.478 3.195-1.024 1.44.435 2.386 1.596 2.086 2.612M85.714 206.67c.036 1.052-1.189 1.924-2.705 1.943-1.525.033-2.758-.818-2.774-1.852 0-1.062 1.197-1.926 2.721-1.951 1.516-.03 2.758.815 2.758 1.86M96.228 206.267c.182 1.026-.872 2.08-2.377 2.36-1.48.27-2.85-.363-3.039-1.38-.184-1.052.89-2.105 2.367-2.378 1.508-.262 2.857.355 3.049 1.398"
                  />
                </svg>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
