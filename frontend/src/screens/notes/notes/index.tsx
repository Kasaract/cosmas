import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import {
  ChevronLeftIcon,
  DownloadIcon,
  Icon,
  MenuIcon,
  SearchIcon,
  CloseIcon,
  CircleIcon,
} from "@/components/ui/icon";
import { isWeb } from "@gluestack-ui/nativewind-utils/IsWeb";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { Pressable } from "@/components/ui/pressable";
import type { LucideIcon } from "lucide-react-native";
import { FeedIcon } from "./assets/icons/feed";
import { GlobeIcon } from "./assets/icons/globe";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { useState } from "react";
import { Heading } from "@/components/ui/heading";
import Image from "@unitools/image";
import { ScrollView } from "@/components/ui/scroll-view";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@/components/ui/modal";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
} from "@/components/ui/select";
import { ChevronDownIcon } from "@/components/ui/icon";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import useRouter from "@unitools/router";
import { HomeIcon } from "./assets/icons/home";
import { HeartIcon } from "./assets/icons/heart";
import { ProfileIcon } from "./assets/icons/profile";
import { SafeAreaView } from "@/components/ui/safe-area-view";
import { cn } from "@gluestack-ui/nativewind-utils/cn";
import { Platform } from "react-native";
type MobileHeaderProps = {
  title: string;
};

type HeaderProps = {
  title: string;
  toggleSidebar: () => void;
};

type Icons = {
  iconName: LucideIcon | typeof Icon;
};
const list: Icons[] = [
  {
    iconName: HomeIcon,
  },
  {
    iconName: FeedIcon,
  },
  {
    iconName: GlobeIcon,
  },
  {
    iconName: HeartIcon,
  },
];
type BottomTabs = {
  iconName: LucideIcon | typeof Icon;
  iconText: string;
};
const bottomTabsList: BottomTabs[] = [
  {
    iconName: HomeIcon,
    iconText: "Home",
  },

  {
    iconName: GlobeIcon,
    iconText: "Community",
  },
  {
    iconName: FeedIcon,
    iconText: "Feed",
  },
  {
    iconName: HeartIcon,
    iconText: "Favourite",
  },
  {
    iconName: ProfileIcon,
    iconText: "Profile",
  },
];

interface NotesData {
  timestamp: string;
  symptom: string;
  severity: number;
  details: string;
}

const NOTES: NotesData[] = [
  {
    timestamp: new Date().toString(),
    symptom: "Headache",
    severity: 3,
    details: "Mild in back left, probably from dehydration",
  },
  {
    timestamp: new Date().toString(),
    symptom: "Fatigue",
    severity: 5,
    details: "Extensive exhaustion - maybe from PE class",
  },
  {
    timestamp: new Date().toString(),
    symptom: "Dizziness",
    severity: 5,
    details: "Sudden dizziness while walking to class",
  },
];

const Sidebar = () => {
  return (
    <VStack
      className="w-14 pt-5 h-full items-center border-r border-border-300"
      space="xl"
    >
      {list.map((item, index) => {
        return (
          <Pressable key={index}>
            <Icon as={item.iconName} size="xl" />
          </Pressable>
        );
      })}
    </VStack>
  );
};

const DashboardLayout = (props: any) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    props.isSidebarVisible
  );
  function toggleSidebar() {
    setIsSidebarVisible(!isSidebarVisible);
  }

  return (
    <VStack className="h-full w-full bg-background-0">
      <Box className="md:hidden">
        <MobileHeader title={"Back"} />
      </Box>
      <Box className="hidden md:flex">
        <WebHeader toggleSidebar={toggleSidebar} title={props.title} />
      </Box>
      <VStack className="h-full w-full">
        <HStack className="h-full w-full">
          <Box className="hidden md:flex h-full">
            {isSidebarVisible && <Sidebar />}
          </Box>
          <VStack className="w-full">{props.children}</VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

function MobileFooter({ footerIcons }: { footerIcons: any }) {
  const router = useRouter();
  return (
    <HStack
      className={cn(
        "bg-background-0 justify-between w-full absolute left-0 bottom-0 right-0 p-3 overflow-hidden items-center  border-t-border-300  md:hidden border-t",
        { "pb-5": Platform.OS === "ios" },
        { "pb-5": Platform.OS === "android" }
      )}
    >
      {footerIcons.map(
        (
          item: { iconText: string; iconName: any },
          index: React.Key | null | undefined
        ) => {
          return (
            <Pressable
              className="px-0.5 flex-1 flex-col items-center"
              key={index}
              onPress={() => router.push("/news-feed/news-and-feed")}
            >
              <Icon
                as={item.iconName}
                size="md"
                className="h-[32px] w-[65px]"
              />
              <Text className="text-xs text-center text-typography-600">
                {item.iconText}
              </Text>
            </Pressable>
          );
        }
      )}
    </HStack>
  );
}

function WebHeader(props: HeaderProps) {
  return (
    <HStack className="pt-4 pr-10 pb-3 bg-background-0 items-center justify-between border-b border-border-300">
      <HStack className="items-center">
        <Pressable
          onPress={() => {
            props.toggleSidebar();
          }}
        >
          <Icon as={MenuIcon} size="lg" className="mx-5" />
        </Pressable>
        <Text className="text-2xl">{props.title}</Text>
      </HStack>

      <Avatar className="h-9 w-9">
        <AvatarFallbackText className="font-light">A</AvatarFallbackText>
      </Avatar>
    </HStack>
  );
}

function MobileHeader(props: MobileHeaderProps) {
  const router = useRouter();
  return (
    <HStack
      className="py-6 px-4 border-b border-border-300 bg-background-0 items-center"
      space="md"
    >
      <Pressable
        onPress={() => {
          router.back();
        }}
      >
        <Icon as={ChevronLeftIcon} />
      </Pressable>
      <Text className="text-xl">{props.title}</Text>
    </HStack>
  );
}

function AddNote({ isNoteModalOpen, closeNoteModal }: any) {
  return (
    <Modal isOpen={true} onClose={closeNoteModal}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="lg">Add New Note</Heading>
          <ModalCloseButton>
            <Icon as={CloseIcon} className="stroke-background-500" />
          </ModalCloseButton>
        </ModalHeader>
        <ModalBody>
          <VStack className="gap-3">
            <VStack className="gap-1">
              <Heading size="sm">Symptom</Heading>
              <Select>
                <SelectTrigger
                  variant="outline"
                  size="md"
                  className="flex justify-between"
                >
                  <SelectInput placeholder="Select symptom" />
                  <SelectIcon className="mr-3" as={ChevronDownIcon} />
                </SelectTrigger>
                <SelectPortal>
                  <SelectContent>
                    <SelectDragIndicatorWrapper>
                      <SelectDragIndicator />
                    </SelectDragIndicatorWrapper>
                    <SelectItem label="Headache" value="headache" />
                    <SelectItem label="Dizziness" value="dizziness" />
                    <SelectItem label="Cough" value="cough" />
                    <SelectItem label="Runny nose" value="runny nose" />
                    <SelectItem label="Nausea" value="nausea" />
                  </SelectContent>
                </SelectPortal>
              </Select>
            </VStack>
            <VStack className="gap-1">
              <Heading size="sm">Severity</Heading>
              <HStack className="flex justify-around">
                {[1, 2, 3, 4, 5].map((level, index) => (
                  <Button
                    size="sm"
                    variant="outline"
                    action="primary"
                    className="w-xs rounded-full"
                    key={index}
                  >
                    <ButtonText className="text-xs">{level}</ButtonText>
                  </Button>
                ))}
              </HStack>
              <HStack className="flex justify-around">
                {[6, 7, 8, 9, 10].map((level, index) => (
                  <Button
                    size="sm"
                    variant="outline"
                    action="primary"
                    className="w-xs rounded-full"
                    key={index}
                  >
                    <ButtonText className="text-xs">{level}</ButtonText>
                  </Button>
                ))}
              </HStack>
            </VStack>
            <VStack>
              <Heading size="sm">Details</Heading>
              <Textarea size="md" className="">
                <TextareaInput placeholder="Your text goes here..." />
              </Textarea>
            </VStack>
            <Button onPress={closeNoteModal}>
              <ButtonText>Add Note</ButtonText>
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const MainContent = () => {
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);

  const openNoteModal = () => setIsNoteModalOpen(true);
  const closeNoteModal = () => setIsNoteModalOpen(false);

  return (
    <VStack
      className="p-4 pb-0 md:px-10 md:pt-6 md:pb-0 h-full w-full max-w-[1500px] self-center  mb-20 md:mb-2"
      space="2xl"
    >
      <AddNote
        isNoteModalOpen={isNoteModalOpen}
        closeNoteModal={closeNoteModal}
      />
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={openNoteModal}
      >
        <ButtonText>Add note</ButtonText>
      </Button>
      <Heading size="2xl" className="font-roboto">
        Notes
      </Heading>
      <HStack space="2xl" className="h-full w-full flex-1">
        <ScrollView
          className="max-w-[900px] flex-1 md:mb-2"
          contentContainerStyle={{
            paddingBottom: isWeb ? 0 : 140,
          }}
          showsVerticalScrollIndicator={false}
        >
          <VStack className="w-full" space="2xl">
            {NOTES.map((note, index) => {
              return (
                <VStack key={index}>
                  <HStack className="flex justify-between">
                    <Heading size="md">{note.symptom}</Heading>
                    <Text className="text-md">Severity: {note.severity}</Text>
                  </HStack>
                  <Text className="line-clamp-2">{note.details}</Text>
                  <Text className="text-sm">{note.timestamp}</Text>
                </VStack>
              );
            })}
          </VStack>
        </ScrollView>
      </HStack>
    </VStack>
  );
};

export const Notes = () => {
  return (
    <SafeAreaView className="h-full w-full">
      <DashboardLayout title="Notes" isSidebarVisible={true}>
        <MainContent />
      </DashboardLayout>
      {/* <MobileFooter footerIcons={bottomTabsList} /> */}
    </SafeAreaView>
  );
};
