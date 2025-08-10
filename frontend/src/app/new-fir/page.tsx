"use client"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import {
  z
} from "zod"

import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  SmartDatetimeInput
} from "@/components/ui/smart-datetime-input"
import {
  enIN
} from "date-fns/locale"
import {
  Textarea
} from "@/components/ui/textarea"
import {
  Input
} from "@/components/ui/input"
import {
  PhoneInput
} from "@/components/ui/phone-input";
import { Separator } from "@/components/ui/separator"


const formSchema = z.object({
  offenceDateTime: z.unknown(),
  OffenceLocation: z.string(),
  accuserFirstName: z.string().min(1),
  accuserLastName: z.string().min(1),
  accuserFatherFirstName: z.string().min(1),
  accuserFatherlastName: z.string().min(1),
  name_5616333195: z.string(),
  accuserLocation: z.string(),
  offences: z.string(),
  facts: z.string().optional(),
  FIRNumber: z.string(),
  policeStation: z.string()
});

export default function MyForm() {

  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "offenceDateTime": new Date()
    },
  })

  function onSubmit(values: z.infer < typeof formSchema > ) {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <>
   <div className="text-center space-y-2 my-8">
     <h1 className="text-4xl font-extrabold text-secondary-foreground/90 text-shadow-accent-foreground">New FIR</h1>
    <span className="text-secondary-foreground/50">Create a new FIR by entering the details below</span>
   </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-3xl mx-auto py-10">
        <FormField
          control={form.control}
          name="FIRNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>FIR Number</FormLabel>
              <FormControl>
                <Input 
                placeholder="FIR Number"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="policeStation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Police Station</FormLabel>
              <FormControl>
                <Input 
                placeholder="Police Station"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
          />
            <FormField
              control={form.control}
              name="offenceDateTime"
              render={({ field }) => (
              <FormItem>
                <FormLabel>When was the offence committed</FormLabel>
                <FormControl>
                  <SmartDatetimeInput
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="e.g. Tomorrow morning 9am"
                    locale={enIN}
                    hour12
                  />
                </FormControl>
                <FormDescription>Enter the date and the time of offence</FormDescription>
                <FormMessage />
              </FormItem>
              )}
            />
        
        <FormField
          control={form.control}
          name="OffenceLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the location of the offence</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
         <Separator />
         <div className="space-y-4 text-md font-bold">
            Name of the complainant (accuser)
         </div>
        <div className="grid grid-cols-12 gap-4">
         
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="accuserFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="FirstName"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="accuserLastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="LastName"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        <Separator />
         <div className="space-y-4 text-md font-bold">
            Name of the complainant's (accuser's) Father
         </div>
        <div className="grid grid-cols-12 gap-4">
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="accuserFatherFirstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="FirstName"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
          <div className="col-span-6">
            
        <FormField
          control={form.control}
          name="accuserFatherlastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input 
                placeholder="LastName"
                
                type="text"
                {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
          </div>
          
        </div>
        
          <FormField
            control={form.control}
            name="name_5616333195"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
              <FormLabel>Phone number</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput
                    placeholder=""
                    {...field}
                    defaultCountry="TR"
                  />
                </FormControl>
              <FormDescription>Enter  phone number.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
            
        
        <FormField
          control={form.control}
          name="accuserLocation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the location of the accuser</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="offences"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Offences</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Enter the offences committed comma(,) seperated</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="facts"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brief facts</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Placeholder"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>Add the brief facts about the case</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </>
  )
}